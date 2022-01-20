import request, { Response } from "supertest";
import app from '../app';
import { connectToDatabase, closeDatabase } from '../data';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../interfaces/todo.interface';

let aTodo: any = {
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
    todoService.findAll()
      .then((results) => {
        expect(results).not.toBe(undefined);
        done()
      })
      .catch((err) => done(err));
  });


  test("Modify a todo", async () => {
    const allRes = await todoService.add(aTodo);
    const { id, ...todo } = allRes;
    expect(todo).toEqual(aTodo);

    if (id) {
      // const editTodo = { ...aTodo, done: true };
      aTodo.done = true;
      const editRes = await todoService.update(id, aTodo);
      expect(editRes).toEqual(allRes);
    }
  });
})
  