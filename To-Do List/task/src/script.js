function addNewTask(task) {
    let taskInputField = document.getElementById("input-task");
    let taskText = getTaskDescription(taskInputField, task);

    if (taskText !== ''){
        //region variables
        let tasks = document.getElementById("task-list")
        let newTask = document.createElement("li");
        let taskCheck = document.createElement("input");
        let taskDescription = document.createElement("span");
        let taskDelete = document.createElement("button");
        //endregion

        //region new task components
        newTask.className = "task-row";
        taskCheck.type = "checkbox";
        taskCheck.addEventListener("click", checkTask)
        taskDescription.className = "task";
        taskDescription.innerHTML= taskText;
        taskDelete.className = "delete-btn";
        taskDelete.innerHTML = "Delete";
        taskDelete.addEventListener("click", removeTask);
        //endregion

        //region new task compilation
        newTask.appendChild(taskCheck);
        newTask.appendChild(taskDescription);
        newTask.appendChild(taskDelete);
        //endregion

        //region adding to the localstorage
        let taskObj = {"description": taskText, "isCompleted": false};
        setJSON(generateKey(),taskObj);
        //endregion

        //region adding new task to the screen
        tasks.appendChild(newTask);
        taskInputField.value = "";
        //endregion
    }
}

function removeTask() {
    let parent = this.parentNode;
    let grandParent = parent.parentNode;
    grandParent.removeChild(parent)
    this.removeEventListener();
}

function checkTask(){
    let parent = this.parentNode;
    let description = parent.querySelector(".task");
    description.classList.toggle("checked");
}

function getTaskDescription(taskInputField, task){
    if (task !== null){
        return task["description"];
    }
    else{
       return taskInputField;
    }

}

function generateKey() {
    return "task_" + Date.now();
}

//region localStorage wrappers
function errorMessage(exceptionItem, alertMessage){
    alert(alertMessage);
    console.log(exceptionItem);
}

function getItem(key) {
    try {
        return window.localStorage.getItem(key);
    }
    catch (e) {
        errorMessage(e, "Ошибка чтения из хранилища localstorage. См.log");
    }
}

function setItem(key, value) {
    try {
        return window.localStorage.setItem(key, value)
    }
    catch (e){
        errorMessage(e, "Ошибка записи в хранилище localstorage. См.log");
    }
}

function getJSON(key) {
    try {
        const json = getItem(key);
        return JSON.parse(json);
    }
    catch (e) {
        errorMessage(e, "Ошибка чтения JSON. См.log");
    }
}

function setJSON(key, value) {
    try {
        const json = JSON.stringify(value);
        setItem(key, json)
    }
    catch (e) {
        errorMessage(e, "Ошибка записи JSON. См.log");
    }
}
//endregion

function readLocalStorage (){
    let tasks = [];
    for (let keyIndex=0; keyIndex < localStorage.length; key++){
        let key = window.localStorage.key(keyIndex);
        if (key.startsWith("task_")){
           tasks.push(getJSON(key));
        }
    }
    return tasks;
}

function initializeTaskList() {
    let tasks = readLocalStorage();
    let q = tasks.length;

    if (q !== 0) {
        for(let taskIndex = 0; taskIndex < q; taskIndex++) {
            addNewTask(tasks[taskIndex]);
        }
    }
}

document.getElementById("add-task-button").addEventListener("click", addNewTask);
initializeTaskList();
