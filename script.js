let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function addTask(){

    let task = {
        id: Date.now(),
        title: taskInput.value,
        list: listInput.value,
        date: dateTime.value,
        completed:false
    };

    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    displayTasks();

    taskInput.value="";
    listInput.value="";
    dateTime.value="";
}



function displayTasks(){

    let output="";

    tasks.forEach(task=>{

        output += `
        <div class="task">

        <h3 class="${task.completed?'completed':''}">
        ${task.title}
        </h3>

        <p>List: ${task.list}</p>

        <p>Date: ${task.date}</p>


        <button onclick="completeTask(${task.id})">
        Complete
        </button>


        <button onclick="editTask(${task.id})">
        Edit
        </button>


        <button onclick="deleteTask(${task.id})">
        Delete
        </button>


        </div>
        `;
    });


    document.getElementById("taskList").innerHTML=output;

}



function completeTask(id){

    tasks = tasks.map(task=>{

        if(task.id===id){
            task.completed=!task.completed;
        }

        return task;

    });


    save();
}



function editTask(id){

    let task = tasks.find(t=>t.id===id);

    let newTask = prompt(
        "Edit Task",
        task.title
    );


    if(newTask){

        task.title=newTask;

        save();
    }

}



function deleteTask(id){

    tasks = tasks.filter(
        task=>task.id!==id
    );

    save();

}



function save(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}


displayTasks();