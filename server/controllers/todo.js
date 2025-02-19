import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = new Todo({ title, description });
    todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo Created",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos);

    return res.status(200).json({
      success: true,
      todos: todos.length === 0 ? [] : todos,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title } = req.body;
    console.log(title);
    // const todo = await Todo.findById(todoId);
    // todo.title = title;
    const todo = await Todo.findByIdAndUpdate(todoId, { title }, { new: true });
    await todo.save();
    return res.status(200).json({
      success: true,
      todo,
      message: "Todo Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    // const userId = req.id;
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
