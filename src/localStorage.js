function saveTasksToLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function getTasksFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}
