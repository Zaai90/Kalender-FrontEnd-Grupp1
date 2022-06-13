document.addEventListener('DOMContentLoaded', main);
const tasks = [];

function main(){
    
}

function createTask(date, name, description){
    return {
        date : date,
        name : name,
        description : description,
        id : getTaskId()
    }
}

function getTaskId(){
    return tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1;
}

function addTaskToList(task){
    tasks.push(task);
}

function deleteTask(task){
    const taskIndex = tasks.indexOf(tasks.find(task => task.id == task.id));
    tasks.splice(taskIndex, 1);
}