import  { model, Schema } from "mongoose";
import { ITodo } from '../interfaces/todo.interface';

export const TodoSchema = new Schema({
  name: { type: String, required: [true, "Field is required"] },
  done: { type: Boolean, required: [true, "Field is required"] },
  weight: { type: Number, required: [true, "Field is required"] },
}, { versionKey: false });

const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;