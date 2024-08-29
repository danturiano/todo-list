import { unique } from "webpack-merge";
import { DataController } from "./dataController";

class Todo {
  constructor(id, task, description, dueDate, priority) {
    this.id = id;
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export function TodoController() {
  const data = DataController();

  const storedTodos = data.retrieveData("TodayTask") || [];
  let uniqueID = 0;

  const createTodo = () => {
    const todo = new Todo(
      uniqueID,
      task.value,
      description.value,
      date.value,
      priority.value
    );
    uniqueID += 1;
    data.addTodoInData("TodayTask", todo);
  };

  const removeTodo = (element) => {
    data.removeTodoInData("TodayTask", element);
  };

  const getTodoData = () => {
    return data.retrieveData("TodayTask");
  };

  return { createTodo, getTodoData, removeTodo };
}
