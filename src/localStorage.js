const taskArray = "taskArray";

function saveTasksToLocalStorage(tasks){
    localStorage.setItem(taskArray, JSON.stringify(tasks));
}
function getTasksFromLocalStorage(){
    return JSON.parse(localStorage.getItem(taskArray));
}
