// New To Do List

let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");

let tasksArea = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");

let info = document.querySelector(".info");
let tasksCount = document.querySelector(".tasks-num span");
let completeCount = document.querySelector(".completed span");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorage();
showCounts();

addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    tasksArea.innerHTML = "";
    addTaskToArray(input.value);
    input.value = "";
  }
});

tasksArea.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    deleteFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }
  
  if (e.target.classList.contains("task")) {
    toggleStatusTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("task-done");
  }
  showCounts();
});

deleteAll.addEventListener("click", () => {
  deleteAllTasks();
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  arrayOfTasks.push(task);

  addTasksToPage(arrayOfTasks);
  addToLocalStorage(arrayOfTasks);
  showCounts();
}

function addTasksToPage(arrayOfTasks) {
  tasksArea.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    if (task.completed) {
      taskDiv.className = "task task-done";
    }
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.innerHTML = task.title;

    let deleteBtn = document.createElement("div");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "Delete";

    taskDiv.appendChild(deleteBtn);

    tasksArea.appendChild(taskDiv);
  });
  showCounts();
}

function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

function deleteFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayOfTasks);
  showCounts();
}

function toggleStatusTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
  showCounts();
}

function deleteAllTasks() {
  tasksArea.innerHTML = "";
  window.localStorage.clear();
  arrayOfTasks = [];

  showCounts();
}

function showCounts() {
  let totalTasks = arrayOfTasks.length;
  let completedTasks = arrayOfTasks.filter((task) => task.completed).length;

  tasksCount.innerHTML = totalTasks;
  completeCount.innerHTML = completedTasks;
}
