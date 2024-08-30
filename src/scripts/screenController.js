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
    console.log(todo.getTodoData());
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

    viewTaskBtn.addEventListener("click", () => {
      EditTask(element);
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

  //Edit Todo
  function EditTask(element) {
    // Create the modal container
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.classList.add("modal");

    //Create modal content container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-content");

    // Create the paragraph
    const paragraph = document.createElement("p");
    paragraph.textContent = "Edit Task";

    // Create the form
    const form = document.createElement("form");
    form.action = "";

    // Create the input container
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("text-input");

    // Create the text inputs
    const task = document.createElement("input");
    task.classList.add("form-style", "task-txt");
    task.type = "text";
    task.value = element.task;
    const description = document.createElement("input");
    description.classList.add("form-style", "descript-txt");
    description.type = "text";
    description.value = element.description;

    // Append inputs to the input container
    inputContainer.appendChild(task);
    inputContainer.appendChild(description);

    // Create the button container
    const csContainer = document.createElement("div");
    const buttonContainer = document.createElement("div");
    const randomContainer = document.createElement("div");
    buttonContainer.classList.add("confirm-input");
    buttonContainer.style.marginTop = "0.8rem";
    csContainer.classList.add("cancel-submit-container");

    // Create the cancel button
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancelBtn", "btn");
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";

    // Create the submit button
    const submitButton = document.createElement("input");
    submitButton.classList.add("submitBtn", "btn");
    submitButton.type = "submit";

    cancelButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      todo.editTodo(element.id, task.value, description.value);
      UpdateScreen();
    });

    // Append buttons to the button container
    csContainer.appendChild(cancelButton);
    csContainer.appendChild(submitButton);
    buttonContainer.appendChild(randomContainer);
    buttonContainer.appendChild(csContainer);

    // Append input container and button container to the form
    form.appendChild(inputContainer);
    form.appendChild(buttonContainer);

    // Append paragraph and form to the modal
    modalContainer.appendChild(paragraph);
    modalContainer.appendChild(form);

    modal.appendChild(modalContainer);
    todoContainer.appendChild(modal);
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
