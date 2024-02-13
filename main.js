let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
        isDelete : false
    }
    taskList.push(task);
    console.log(task);
    render();
}

function render() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML +=`<div class="task done">
                <p>${taskList[i].taskContent}</p>
                <div class="button-area">
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="">Delete</button>
                </div>
            </div>`
            } else {
            resultHTML += `<div class="task">
                <p>${taskList[i].taskContent}</p>
                <div class="button-area">
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>`
        }

        if(taskList[i].isDelete == true) {
            resultHTML = '';
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;

}

function toggleComplete(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isDelete = true;
            break;
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2,9);
}