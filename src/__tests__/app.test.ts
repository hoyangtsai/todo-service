import request, { Response } from "supertest";
import app from '../app';
import { connectToDatabase, closeDatabase } from '../data';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../interfaces/todo.interface';
import Todo from '../models/todo.model';

let aTodo = {
  name: 'test 1', done: false, weight: 2
};

beforeAll(async () => await connectToDatabase());
afterAll(async () => await closeDatabase());
// afterEach(async () => await clearDatabase())

describe("Test the todo route", () => {
  test("request common GET method", (done) => {
    request(app).get("/todo")
      .then((response: Response) => {
        // console.log('response :>> ', response);
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch((err: Error) => {
        done(err);
      })
  });
});

describe("Integration with mongoDB", () => {
  const todoService = new TodoService();

  test("Get todos", (done) => {
    todoService.findAll({sort: '', limit: 0})
      .then((results) => {
        console.log('todos results :>> ', results);
        expect(results).not.toBeUndefined();
        done()
      })
      .catch((err) => done(err));
  });


  test("Modify a todo", async () => {
    const newTodo = new Todo(aTodo);
    const addRes = await todoService.add(newTodo);
    // console.log('addRes :>> ', addRes);
    expect(addRes).toMatchObject(aTodo);

    if (addRes._id) {
      let editTodo = { addRes, ...{ done: true} };
      const editRes = await todoService.update(addRes._id, editTodo);
      console.log('editRes :>> ', editRes);
      expect(editRes).toMatchObject(editTodo);
    }
  });
})
  