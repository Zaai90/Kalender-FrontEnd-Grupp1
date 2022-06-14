let taskList;
const datePattern = /\d{4}-\d\d-\d\d/;
let tasks = getFromLocalStorage("taskArray") || [];

function initTasks() {
    addTaskHtml();
    taskList = document.querySelector(".taskList");
    testTaskButton();
    renderAllTasks();
}

function createTask(event) {
    const formData = new FormData(event.target);
    const task = Object.fromEntries(formData.entries());
    task.id = getTaskId();
    addTask(task);
    console.log(asddd)
}

function getTaskId() {
    return tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1;
}

function addTask(task) {
    tasks.push(task);
    saveToLocalStorage("taskArray", tasks);
    renderAllTasks();
}

function deleteTask(task) {
    tasks = getFromLocalStorage("taskArray");
    const taskIndex = tasks.indexOf(tasks.find(t => t.id == task.id));
    tasks.splice(taskIndex, 1);
    saveToLocalStorage("taskArray", tasks);
    renderAllTasks();
}

function renderAllTasks(dateSearch) {
    taskList.innerHTML = "";

    let taskArray = getFromLocalStorage("taskArray");
    taskArray.sort((a, b) => new Date(a.taskDate) - new Date(b.taskDate));

    if (datePattern.exec(dateSearch))
        taskArray = taskArray.filter(t => t.taskDate == dateSearch);
    else
        taskArray = taskArray.filter(t => t.taskDate >= formatDateToString(dateNow))

    for (const task of taskArray) {
        renderTask(task);
    }
}

function renderTask(task) {
    let li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `<p class="taskName">${task.taskName}</p>
                    <p class="taskDescription">${task.taskDescription}</p>
                    <p class="taskDate">${task.taskDate}</p>`;
    taskList.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.className = "taskDeleteButton";
    deleteButton.innerHTML = "➖";
    deleteButton.addEventListener("click", () => deleteTask(task));

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    buttonContainer.appendChild(deleteButton);
    taskList.appendChild(buttonContainer);
    taskList.appendChild(document.createElement("hr"))
}

function testTaskButton() {
    const testButton = document.querySelector(".addTestTasks");
    testButton.addEventListener("click", addTestTasks);
}


function addTestTasks() {
    localStorage.setItem("taskArray", `
[
    {
    	"taskDate": "2022-07-12",
        "taskName": "Mow the lawn",
        "taskDescription": "Use the riding mower, it's fast and easy",
        "id": 11
    },
    {
    	"taskDate": "2022-07-12",
        "taskName": "Do the dishes",
        "taskDescription": "important",
        "id": 1
    },
    {
    	"taskDate": "2022-06-17",
        "taskName": "Add edit button",
        "taskDescription": "would b cool",
        "id": 2
    },
    {
		"taskDate": "1337-08-05",
        "taskName": "Take a walk",
        "taskDescription": "very nice",
        "id": 3
    },
    {
		"taskDate": "2022-06-01",
        "taskName": "learn javascript 101",
        "taskDescription": "!!!",
        "id": 4
    },
    {
		"taskDate": "2022-06-30",
        "taskName": "Eat an apple",
        "taskDescription": "An apple a day keeps the doctor away",
        "id": 5
    },
    {
		"taskDate": "2022-06-30",
        "taskName": "Brush your teeth",
        "taskDescription": "Teeth are important, but not as important as you think",
        "id": 6
    },
    {
		"taskDate": "2022-06-14",
        "taskName": "learn more javascript",
        "taskDescription": "JavaScript is the best language ever, but very complicated",
        "id": 7
    },
    {
        "taskDate": "2022-06-12",
        "taskName": "Walk the dog",
        "taskDescription": "I love my dog",
        "id": 8
    },
    {
        "taskDate": "2022-06-12",
        "taskName": "Date with my dog",
        "taskDescription": "I love my dog",
        "id": 9
    },
    {
        "taskDate": "2022-06-24",
        "taskName": "Midsommer",
        "taskDescription": "Midsommar is a swedish tradition, rad!",
        "id": 10
    }
]
    `);
    renderAllTasks();
}


function addTaskHtml() {
    let taskList = document.createElement("ul");
    taskList.className = "taskList";
    let button = document.createElement("button");
    button.className = "addTestTasks";
    button.style = "width: 2rem; height: 2rem;";
    button.innerHTML = "➕";
    document.querySelector(".taskMenu").appendChild(button);
    document.querySelector(".taskContainer").appendChild(taskList);
}