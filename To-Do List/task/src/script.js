function addNewTask () {
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

document.getElementById("add-task-button").addEventListener("click", addNewTask);
