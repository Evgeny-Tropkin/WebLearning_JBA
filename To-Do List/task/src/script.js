function prepareNewTask(taskId, taskText, isComplete) {

    if (taskText !== ''){
        //region variables
        let tasks = document.getElementById("task-list")
        let newTask = document.createElement("li");
        let taskCheck = document.createElement("input");
        let taskDescription = document.createElement("span");
        let taskDelete = document.createElement("button");
        let iD = taskId? taskId: generateKey();
        //endregion

        //region new task components
        newTask.className = "task-row";
        newTask.id = iD;
        taskCheck.type = "checkbox";
        taskCheck.checked = isComplete;
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

        //region prepare for adding to the localstorage
        let taskObj = {"id": taskId, "description": taskText, "isCompleted": false};
        //endregion

        //region adding new task to the screen
        tasks.appendChild(newTask);
        //endregion

        return taskObj;
    }
}

function removeTask() {
    let parent = this.parentNode;
    let grandParent = parent.parentNode;
    let taskKey = parent.id;
    console.log(taskKey);
    grandParent.removeChild(parent)
    //this.removeEventListener("click", this);
    removeTaskFromLocalStorage(taskKey);
}

function checkTask(){
    let parent = this.parentNode;
    let description = parent.querySelector(".task");
    description.classList.toggle("checked");
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

function deleteItem(key) {
    try {
        console.log(`Remove ${key} from localStorage`)
        return window.localStorage.removeItem(key);
    }
    catch (e){
        errorMessage(e, "Ошибка удаления информации из localstorage. См.log");
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
    console.log("Start reading from localStorage");
    let tasks = [];
    for (let keyIndex=0; keyIndex < localStorage.length; keyIndex++){
        let key = window.localStorage.key(keyIndex);
        if (key.startsWith("task_")){
           tasks.push(getJSON(key));
        }
    }
    if (tasks.length === 0) {
        alert("В localStorage отсутствуют сохраненные задачи!");
    }
    console.log("Reading from localStorage is completed");
    return tasks;
}

function addTaskFromLocalStorage(task) {
    prepareNewTask(task.id, task.description, task.isCompleted);
}

function addNewTaskToLocalStorage(key, taskObj) {
        setJSON(key, taskObj);
}

function removeTaskFromLocalStorage(taskKey) {
    deleteItem(taskKey);
    console.log(`Задача ${taskKey} удалена из localStorage`);
}

function initializeTaskList() {
    let tasks = readLocalStorage();
    let q = tasks.length;

    if (q !== 0) {
        for(let taskIndex = 0; taskIndex < q; taskIndex++) {
            addTaskFromLocalStorage(tasks[taskIndex]);
        }
    }
}

function addNewTask() {
    let taskInputField = document.getElementById("input-task");
    let task = prepareNewTask(taskInputField.value, false);
    let key = task.id;

    addNewTaskToLocalStorage(key, task);
    taskInputField.value = "";
}

document.getElementById("add-task-button").addEventListener("click", addNewTask);
initializeTaskList();
