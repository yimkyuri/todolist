let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs li");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("underline");


addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for(let i=0; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    });
}

function addTask() {
    if (taskInput.value != "" ) {
        let task = {
            id : randomIDGenerate(),
            taskContent : taskInput.value,
            isComplete : false
        }
        taskList.push(task);
        filter();
        taskInput.value = "";
    }
}

function render() {
    let resultHTML = '';
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else {
        list = filterList;
    }
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML +=`<div class="task done" id="${list[i].id}">
                <p>${list[i].taskContent}</p>
                <div class="button-area">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`
            } else {
            resultHTML += `<div class="task" id="${list[i].id}">
                <p>${list[i].taskContent}</p>
                <div class="button-area">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-circle"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;

}

function toggleComplete(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
        }
    }
    filter();
}

function filter(e) {
    if (e) {
      mode = e.target.id;
      underLine.style.width = e.target.offsetWidth + "px";
      underLine.style.left = e.target.offsetLeft + "px";
    } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
  

    filterList = [];
    if (mode === "ing") {
        for (let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "end") {
        for (let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2,9);
}