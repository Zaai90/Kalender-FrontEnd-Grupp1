const tasks = [];

function addTaskToList(event){
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
}

function deleteTask(task){
    const taskIndex = tasks.indexOf(tasks.find(t => t.id == task.id));
    tasks.splice(taskIndex, 1);
}
