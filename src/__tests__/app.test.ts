import request, { Response } from "supertest";
import app from '../app';
import { connectToDatabase, closeDatabase } from '../data';

let aTodo = {
  name: 'test nnn', done: false, weight: 1
};

beforeAll(async () => await connectToDatabase());
afterAll(async () => await closeDatabase());
// afterEach(async () => await clearDatabase())

describe("Test the todo route", () => {
  test("common GET method", (done) => {
    request(app).get("/todo")
      .then((res: Response) => {
        expect(res.statusCode).toBe(200)
        done()
      })
      .catch((err: Error) => {
        done(err)
      })
  });

  test("request all todos", (done) => {
    request(app).get("/todo/all")
      .then((res: Response) => {
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        done()
      })
      .catch((err: Error) => {
        done(err)
      })
  });

  test("modify a todo", async () => {    
    const insertResult: Response = await request(app).post("/todo/add").send(aTodo);

    expect(insertResult.statusCode).toBe(200)
    expect(insertResult.body).toMatchObject(aTodo)

    const todoId = insertResult.body.id;

    if (todoId) {
      const alterResult = await request(app).put(`/todo/${todoId}`).send({ done: true, weight: 5 });
      expect(alterResult.statusCode).toBe(200)
      expect(alterResult.body.id).toEqual(todoId)
      expect(alterResult.body).toEqual(expect.objectContaining(aTodo))

      const removeResult = await request(app).delete(`/todo/${todoId}`);
      expect(removeResult).not.toBeUndefined()
    }
  })
});
  