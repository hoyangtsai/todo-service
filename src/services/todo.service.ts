import { ITodo } from '../interfaces/todo.interface';
import Todo from '../models/todo.model'

type QueryOption = {
  sort: string | 'desc' | 'asc'
  limit: number
}

// interface QueryOption 
export class TodoService {
  public getWelcomeMessage() {
    return 'Welcome to todo RESTful service';
  }

  public findAll(options: QueryOption): Promise<ITodo[]> {
    const query = Todo.find({});
    if (options.sort === 'asc' || options.sort === 'desc') {
      query.sort({weight: options.sort})
    }
    if (options.limit) {
      query.limit(options.limit)
    }
    return query.exec();
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