import { ITodo } from '../interfaces/todo.interface';
import Todo from '../models/todo.model'

export class TodoService {
  public getWelcomeMessage() {
    return 'Welcome to todo RESTful service';
  }

  public findAll(): Promise<ITodo[]> {
    return Todo.find({}).exec();
  }

  public add(todo: ITodo): Promise<ITodo> {
    const newTodo = new Todo(todo);
    return newTodo.save();
  }

  public async delete(id: string): Promise<ITodo | null> {
    const deletedTodo = await Todo.findByIdAndDelete(
      id
    ).exec();

    if (!deletedTodo) {
      throw new Error(`Todo with id '${id}' not found`);
    //   throw new HttpError(`Todo with id '${id}' not found`, 404);
    }

    return deletedTodo;
  }
  
  public async update(id: string, todo: ITodo): Promise<ITodo | null> {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      todo
    ).exec();

    if (!updatedTodo) {
      throw new Error(`Todo with id '${id}' not found`);
    }

    return updatedTodo;
  }
}