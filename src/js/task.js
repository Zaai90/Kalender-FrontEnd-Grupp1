let taskList;
const datePattern = /\d{4}-\d\d-\d\d/;
let tasks = getFromLocalStorage("taskArray") || [];

function initTasks() {
  addTaskHtml();
  taskList = document.querySelector(".taskList");
  renderAllTasks();
}

function createTask(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const task = Object.fromEntries(formData.entries());
  task.id = getTaskId();
  addTask(task);
  event.target.reset();
  updateTaskFormDate(task.taskDate);
}

function getTaskId() {
  return tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1;
}

function addTask(task) {
  tasks.push(task);
  saveToLocalStorage("taskArray", tasks);
  update();
}

function deleteTask(task) {
  tasks = getFromLocalStorage("taskArray");
  const taskIndex = tasks.indexOf(tasks.find((t) => t.id == task.id));
  tasks.splice(taskIndex, 1);
  saveToLocalStorage("taskArray", tasks);
  update();
}

function renderAllTasks(dateSearch) {
  taskList.innerHTML = "";

  let taskArray = getFromLocalStorage("taskArray")
    ? getFromLocalStorage("taskArray")
    : [];
  taskArray.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));
  
  if (datePattern.exec(dateSearch)) {
    taskArray = taskArray.filter((t) => t.taskDate == dateSearch);
  } else {
    taskArray = taskArray.filter(
      (t) => t.taskDate >= formatDateToString(dateNow)
      );
    }

  for (const task of taskArray){
    if(!document.querySelector(`#taskDate${task.taskDate}`)){
      const groupContainer = document.createElement("div")
      groupContainer.classList.add("taskDateContainer");
      groupContainer.id = "taskDate" + task.taskDate;

      const dateTitle = document.createElement("h3");
      dateTitle.classList.add("dateTitle");
      dateTitle.innerHTML = task.taskDate;

      taskList.appendChild(dateTitle);
      taskList.appendChild(groupContainer);

      renderTask(task);
    } else{
      renderTask(task);
    } 
  }
}

function renderTask(task) {
  const dateContainer = document.querySelector(`#taskDate${task.taskDate}`);
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");

  let taskInfo = document.createElement("div");
  taskInfo.classList.add("task");
  taskInfo.innerHTML = `<p class="taskName">${task.taskName}</p>
                    <p class="taskDescription">${task.taskDescription}</p>`;
  taskDiv.appendChild(taskInfo);

  let editTaskForm = document.querySelector("#taskForm").cloneNode(true);
  editTaskForm.id = "taskEditForm" + task.id;
  editTaskForm.classList.add("taskEditForm");
  editTaskForm.classList.add("hidden");
  editTaskForm.querySelector(`[name="taskDate"]`).value = task.taskDate;
  editTaskForm.querySelector(`[name="taskName"]`).value = task.taskName;
  editTaskForm.querySelector(`[name="taskDescription"]`).value =
    task.taskDescription;
  editTaskForm.addEventListener("submit", (e) => editTask(e));

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("taskDeleteButton");
  deleteButton.innerHTML = "Delete task";
  deleteButton.addEventListener("click", () => deleteTask(task));

  var editButton = document.createElement("button");
  editButton.classList.add("taskEditButton");
  editButton.innerHTML = "Edit task";
  editButton.addEventListener("click", () =>
    toggleElemVisibility(editTaskForm)
  );

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);
  taskDiv.appendChild(buttonContainer);
  taskDiv.appendChild(editTaskForm);
  dateContainer.appendChild(taskDiv);
}

function updateTaskFormDate(date) {
  document.querySelector(`[name="taskDate"]`).value = date;
}

function editTask(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const task = Object.fromEntries(formData.entries());
  const taskId = event.target.id.replace("taskEditForm", "");
  const taskIndex = tasks.indexOf(tasks.find((task) => task.id == taskId));

  if (task.taskName) {
    tasks[taskIndex].taskName = task.taskName;
  }

  if (task.taskDescription) {
    tasks[taskIndex].taskDescription = task.taskDescription;
  }

  if (task.taskDate) {
    tasks[taskIndex].taskDate = task.taskDate;
  }

  saveToLocalStorage("taskArray", tasks);
  update();
}

function addTaskHtml() {
  addTaskListHtml();
  addHideTasksButtonHtml();
  addTaskFormHtml();
  addAddTaskButtonHtml();
}

function addTaskListHtml() {
  let taskList = document.createElement("ul");
  taskList.className = "taskList";

  document.querySelector(".taskContainer").appendChild(taskList);
}

function addTaskFormHtml() {
  const taskForm = document.createElement("form");
  taskForm.id = "taskForm";
  taskForm.classList.add("taskForm");
  taskForm.classList.add("hidden");
  taskForm.addEventListener("submit", (e) => createTask(e));

  const taskDateInput = document.createElement("input");
  taskDateInput.type = "date";
  taskDateInput.name = "taskDate";
  taskDateInput.value = formatDateToString(dateNow);
  const taskDateLabel = document.createElement("label");
  taskDateLabel.setAttribute("for", taskDateInput.name);
  taskDateLabel.innerHTML = "Date";
  taskForm.appendChild(taskDateLabel);
  taskForm.appendChild(taskDateInput);

  const taskNameInput = document.createElement("input");
  taskNameInput.type = "text";
  taskNameInput.name = "taskName";
  const taskNameLabel = document.createElement("label");
  taskNameLabel.setAttribute("for", taskNameInput.name);
  taskNameLabel.innerHTML = "Name";
  taskForm.appendChild(taskNameLabel);
  taskForm.appendChild(taskNameInput);

  const taskDescriptionInput = document.createElement("input");
  taskDescriptionInput.type = "text";
  taskDescriptionInput.name = "taskDescription";
  const taskDescriptionLabel = document.createElement("label");
  taskDescriptionLabel.setAttribute("for", taskDescriptionInput.name);
  taskDescriptionLabel.innerHTML = "Description";
  taskForm.appendChild(taskDescriptionLabel);
  taskForm.appendChild(taskDescriptionInput);

  const taskFormSubmitButton = document.createElement("button");
  taskFormSubmitButton.classList.add("createTask");
  taskFormSubmitButton.type = "submit";
  taskFormSubmitButton.innerHTML = "Save task";
  taskForm.appendChild(taskFormSubmitButton);

  document.querySelector(".taskMenu").appendChild(taskForm);
}

function addAddTaskButtonHtml() {
  let addTaskButton = document.createElement("button");
  addTaskButton.id = "addTaskButton";
  addTaskButton.className = "addTask";
  addTaskButton.innerHTML = "Add new task";
  addTaskButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#taskForm"))
  );
  addTaskButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#addTaskButton"))
  );
  addTaskButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#hideTasksButton"))
  );

  document.querySelector(".taskMenu").appendChild(addTaskButton);
}

function addHideTasksButtonHtml() {
  let hideTasksButton = document.createElement("button");
  hideTasksButton.id = "hideTasksButton";
  hideTasksButton.className = "hideTasks";
  hideTasksButton.innerHTML = "Hide section";
  hideTasksButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#taskForm"))
  );
  hideTasksButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#addTaskButton"))
  );
  hideTasksButton.addEventListener("click", () =>
    toggleElemVisibility(document.querySelector("#hideTasksButton"))
  );
  document.querySelector(".taskMenu").appendChild(hideTasksButton);
  hideTasksButton.classList.add("hidden");
}

function toggleElemVisibility(elem) {
  if (elem.classList.contains("hidden")) {
    elem.classList.remove("hidden");
  } else {
    elem.classList.add("hidden");
  }
}
