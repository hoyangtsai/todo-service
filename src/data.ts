require('dotenv').config();

import mongoose, { Mongoose } from "mongoose";

let mongoClient: Mongoose;

const DATABASE_NAME = process.env.DATABASE_NAME || 'todo-db';
const DATABASE_URL = process.env.DATABASE_URL
  ? (process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017' : process.env.DATABASE_URL)
  : 'mongodb://localhost:27017';

const connect = async (url: string, options: mongoose.ConnectOptions) => {
  // check params
  if (!url || !options) throw Error('connect::missing required params');

  return mongoose.connect(url, options);
};

const connectToDatabase = async (): Promise<Mongoose | undefined> => {
  try {
    if (!DATABASE_URL || !DATABASE_NAME) {
      console.log('DB required params are missing');
      console.log(`DB required params DATABASE_URL = ${DATABASE_URL}`);
      console.log(`DB required params DATABASE_NAME = ${DATABASE_NAME}`);
    }

    console.log(`DATABASE_URL = ${DATABASE_URL}`);
    console.log(`DATABASE_NAME = ${DATABASE_NAME}`);

    mongoClient = await connect(DATABASE_URL, { dbName: DATABASE_NAME });

    mongoClient.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });
    
    mongoClient.connection.on('connect', () => console.log('Mongoose connected to db...'));
    mongoClient.connection.on('error', (err) => console.log(`Mongoose error: ${err.message}`));

    console.log(`DB connected = ${mongoClient.connection.readyState === 1}`);

    return mongoClient;
  } catch (err) {
    console.log(`DB not connected - err`);
    console.log(err);
  }
}

const closeDatabase = async () => {
  if (mongoClient) {
    await mongoClient.disconnect();
  }
}

const getMongoClient = () => {
  return mongoClient;
}

export {
  connectToDatabase,
  closeDatabase,
  getMongoClient
}
