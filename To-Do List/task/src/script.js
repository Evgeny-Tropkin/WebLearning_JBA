function addNewTask (task) {
    let taskInputField = document.getElementById("input-task");
    let taskText = taskInputField.value;
    if (taskText !== ''){
        let tasks = document.getElementById("task-list")
        let newTask = document.createElement("li");
        let taskCheck = document.createElement("input");
        let taskDescription = document.createElement("span");
        let taskDelete = document.createElement("button");

        newTask.className = "task-row";
        taskCheck.type = "checkbox";
        taskCheck.addEventListener("click", checkTask)
        taskDescription.className = "task";
        taskDescription.innerHTML= taskText;
        taskDelete.className = "delete-btn";
        taskDelete.innerHTML = "Delete";
        taskDelete.addEventListener("click", removeTask);

        newTask.appendChild(taskCheck);
        newTask.appendChild(taskDescription);
        newTask.appendChild(taskDelete);
        tasks.appendChild(newTask);
        taskInputField.value = "";
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

function readLocalStorage (){
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    if (taskList.length > 0){
        taskList.forEach(
            function (task){
                addNewTask(task);
            }
        )
    }
}

readLocalStorage();
document.getElementById("add-task-button").addEventListener("click", addNewTask);
