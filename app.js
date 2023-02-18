// UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');


loadEventListeners();

function loadEventListeners(){
    // Add Task submit event
    form.addEventListener('submit', addTask);

    // Clear single Tasks
    taskList.addEventListener('click', removeTask);

    // Clear all Tasks
    clrBtn.addEventListener('click', removeTasks);

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
    
    taskInput.value = '';

    e.preventDefault();
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        e.target.parentElement.parentElement.remove();
    }
}

function removeTasks(){

    while(taskList.firstChild){
        taskList.removeChild(taskList.lastChild);
    }
    
}
