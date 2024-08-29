import { TodoController } from "./todoController.js";
import { format, compareAsc } from "date-fns";

export function ScreenController() {
  let todo = TodoController();

  //BUTTONS
  const addTaskBtn = document.querySelector(".add-task");
  const cancelAddTaskBtn = document.querySelector(".cancelBtn");
  const submitBtn = document.querySelector(".submitBtn");

  //CONTAINERS
  const addTaskContainer = document.querySelector(".add-task-container");
  const formContainer = document.querySelector(".main-form-container");
  const todoContainer = document.querySelector(".todo-container");

  //DATA
  const taskValue = document.getElementById("task");
  const descriptionValue = document.getElementById("description");
  const dateValue = document.getElementById("date");

  //EVENT LISTENERS
  addTaskBtn.addEventListener("click", () => {
    ShowAddTask();
  });

  cancelAddTaskBtn.addEventListener("click", () => {
    HideAddTask();
  });

  taskValue.addEventListener("input", (event) => {
    const currentValue = event.target.value;
    if (currentValue != "") {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "#fa5252";
    }
  });

  formContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    todo.createTodo();
    UpdateScreen();
    ClearInputField();
    HideAddTask();
  });

  //FUNCTIONS
  //UPDATE SCREEN
  function UpdateScreen() {
    todoContainer.textContent = "";
    let data = todo.getTodoData();
    data.forEach((todo) => {
      DisplayTodo(todo);
    });
  }

  //DISPLAY TODO
  function DisplayTodo(element) {
    const container = document.createElement("div");
    const markCompleteContainer = document.createElement("div");
    const taskDescriptionContainer = document.createElement("div");
    const completeBtn = document.createElement("button");
    const viewTaskBtn = document.createElement("button");
    const taskTitle = document.createElement("p");
    const taskDescript = document.createElement("p");

    container.classList.add("individual-container");
    markCompleteContainer.classList.add("mark-done");
    taskDescriptionContainer.classList.add("todo-descript");
    completeBtn.classList.add("doneBtn");
    viewTaskBtn.classList.add("bigBtn");
    taskTitle.classList.add("task-txt");
    taskDescript.classList.add("descript-txt");

    completeBtn.addEventListener("click", () => {
      todo.removeTodo(element);
      UpdateScreen();
    });

    taskTitle.textContent = element.task;
    taskDescript.textContent = element.description;

    markCompleteContainer.appendChild(completeBtn);
    taskDescriptionContainer.appendChild(viewTaskBtn);
    viewTaskBtn.appendChild(taskTitle);
    viewTaskBtn.appendChild(taskDescript);

    container.appendChild(markCompleteContainer);
    container.appendChild(taskDescriptionContainer);
    todoContainer.appendChild(container);
  }

  //Show Add Task Container
  function ShowAddTask() {
    addTaskContainer.style.display = "none";
    formContainer.style.display = "block";
  }

  //Hide Add Task Container
  function HideAddTask() {
    addTaskContainer.style.display = "block";
    formContainer.style.display = "none";
  }

  //Clear Input Fields
  function ClearInputField() {
    taskValue.value = "";
    descriptionValue.value = "";
    dateValue.value = "";
  }
  UpdateScreen();
}
