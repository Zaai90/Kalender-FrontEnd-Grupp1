var tasks = getFromLocalStorage("taskArray") || [];
const datePattern = /\d{4}-\d\d-\d\d/;
addTaskHtml()

function createTask(event){
    const formData = new FormData(event.target);
    const task = Object.fromEntries(formData.entries());   
    task.id = getTaskId();
    addTask(task);
}

function getTaskId(){
    return tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1;
}

function addTask(task){
    tasks.push(task);
    saveToLocalStorage("taskArray", tasks);
    renderTasks();
}

function deleteTask(task){
    tasks = getFromLocalStorage("taskArray");
    const taskIndex = tasks.indexOf(tasks.find(t => t.id == task.id));
    tasks.splice(taskIndex, 1);
    saveToLocalStorage("taskArray", tasks);
    renderTasks();
}

function renderTasks(dateSearch){
    taskList = document.querySelector(".taskList");
    taskList.innerHTML = "";

    let taskArray = getFromLocalStorage("taskArray");
    // taskArray.sort(function(a,b){
    //     return new Date(a.taskDate) - new Date(b.taskDate);
    // });
    taskArray.sort((a,b) => new Date(a.taskDate) - new Date(b.taskDate));

    if(dateSearch && datePattern.exec(dateSearch))
        taskArray = taskArray.filter(t => t.taskDate == dateSearch);

    for(const task of taskArray){
        let elem = document.createElement("li");
        elem.innerHTML = `<p class="taskName">${task.taskName}</p>
                        <p class="taskDescription">${task.taskDescription}</p>
                        <p class="taskDate">${task.taskDate}</p>`;    
        taskList.appendChild(elem);

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
}

function testTaskButton(){
    const testButton = document.querySelector(".addTestTasks");
    testButton.addEventListener("click", addTestTasks);
}
testTaskButton();

function addTestTasks(){
    localStorage.setItem("taskArray", `
[
    {
    	"taskDate": "2020-07-12",
        "taskName": "Do the dishes",
        "taskDescription": "important",
        "id": 1
    },
    {
    	"taskDate": "2020-06-17",
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
		"taskDate": "2020-06-03",
        "taskName": "learn javascript",
        "taskDescription": "!!!",
        "id": 4
    },
    {
        "taskDate": "2020-06-12",
        "taskName": "asd",
        "taskDescription": "test test",
        "id": 5
    }
]
    `);
    renderTasks();
}


function addTaskHtml(){
    let taskList = document.createElement("ul");
    taskList.className = "taskList";
    document.querySelector("aside").appendChild(taskList);
}
