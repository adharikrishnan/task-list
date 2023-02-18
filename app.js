// UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filterBar = document.getElementById('filter');
const taskInput = document.getElementById('task');


loadEventListeners();

function loadEventListeners(){

    //DOM load event
    document.addEventListener('DOMContentLoaded', loadTasks)
    // Add Task submit event
    form.addEventListener('submit', addTask);

    // Clear single Tasks
    taskList.addEventListener('click', removeTask);

    // Clear all Tasks
    clrBtn.addEventListener('click', removeTasks);

    filterBar.addEventListener('keyup', filterTasks);
}

function loadTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(typeof tasks);   
    }

    tasks.forEach(function(task){

        const liElement = document.createElement('li');
        liElement.className = 'collection-item';
        liElement.appendChild(document.createTextNode(task));
        
        const iLink = document.createElement('a');
        iLink.className = 'delete-item secondary-content';

        iLink.innerHTML =  '<i class="fa fa-remove"></i>';

        liElement.appendChild(iLink);

        taskList.appendChild(liElement);

    })

}

function addTask(e){

    if(taskInput.value === ''){
        alert("Please Enter a Task !");
    }

    const liElement = document.createElement('li');
    liElement.className = 'collection-item';
    liElement.appendChild(document.createTextNode(taskInput.value));
    
    const iLink = document.createElement('a');
    iLink.className = 'delete-item secondary-content';

    iLink.innerHTML =  '<i class="fa fa-remove"></i>';

    liElement.appendChild(iLink);

    taskList.appendChild(liElement);

    storeToLocalStorage(taskInput.value);
    
    taskInput.value = '';

    e.preventDefault();
}

function storeToLocalStorage(input){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(typeof tasks);   
    }
    tasks.push(input);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}



function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm("Are you Sure about that?")){
            e.target.parentElement.parentElement.remove();
        }

        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        
    }

}

function removeTaskFromLocalStorage(taskItem){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(typeof tasks);   
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTasks(){

    while(taskList.firstChild){
        taskList.removeChild(taskList.lastChild);
    }

    clearTasksFromLocalStorage();
    
}

function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

function filterTasks(e){

    const fText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(fText) != -1){
            task.style.display ='block';
        } else {
            task.style.display = 'none';
        }

    }); 
}
