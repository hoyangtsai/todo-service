import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { connectToDatabase } from './data';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    // Allows to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }));
    // Allows to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    // Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
    if (process.env.NODE_ENV != "test") {
      connectToDatabase();
    }
  }

  private setControllers() {
    this.app.get("/", (req, res) => {
      res.status(200).send("Hello World!");
    });

    // Creating a new instance
    const todoController = new TodoController(new TodoService());
    // Telling express to use our Controller's routes
    this.app.use("/todo", todoController.router);
  }
}

export default new App().app;