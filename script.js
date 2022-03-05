const keys = {
    done: 'done',
    delete: 'delete',
    all: 'all',
    completed: 'completed',
    uncompleted: 'uncompleted',
    todos: 'todos'
};


// Selectors
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('.todo__list');
const addButton = document.querySelector('#add-todo');
const deleteButtons = document.querySelectorAll('.delete');
const doneButtons = document.querySelectorAll('.done');
const filter = document.querySelector('#filter');


// Event listeners
addButton.addEventListener("click", submitTodo);
todoList.addEventListener("click", action);
filter.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", showLocalTodo);

// Functions
function submitTodo(event){
    event.preventDefault();
    const todo = { task: todoInput.value, completed: false };
    addTodo(todo);
    setLocalTodo(todo);
    todoInput.value = "";
}

function addTodo(todo){
    const todoItem = document.createElement("div");
    todoItem.classList.add('item', 'flex', 'justify-between');
    if(todo.completed) todoItem.classList.add('completed');
    const todoHtmlContent = `
    <div class="item__title">${todo.task}</div>
    <div class="item__action flex align-center">
        <i class="icon done fa-solid fa-check" title="انجام"></i>
        <i class="icon delete fa-regular fa-trash-can" title="حذف"></i>
    </div>
    `;
    todoItem.innerHTML = todoHtmlContent;
    todoList.appendChild(todoItem);
}

function action(event){
    const target = event.target;
    const actionItemElement = target.parentElement;
    const classList = target.classList;
    const taskTitle = actionItemElement.parentElement.children[0].textContent;    
    if(classList.contains(keys.done)){
        const completed = actionItemElement.parentElement.classList.toggle(keys.completed);
        updateCompleteAction(completed, taskTitle);
    } else if(classList.contains(keys.delete)){
        actionItemElement.parentElement.remove();
        removeLocalTodo(taskTitle)
    }
}

function filterTodo(event){
    const selectedFilter = event.target.value;
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        console.log(todo.classList.contains(selectedFilter)) 

        switch(selectedFilter){
            case keys.all:
                todo.style.display = "flex";
                break;
            case keys.completed:
                if(todo.classList.contains(keys.completed)) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case keys.uncompleted:
                if(!todo.classList.contains(keys.completed)) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break                
        }
    })
}

function getLocalTodos(){
    return localStorage.getItem(keys.todos) ? JSON.parse(localStorage.getItem(keys.todos)) : []
}

function setLocalTodo(todo, hasSource = false, source = {}){
    let todos = getLocalTodos();
    if (hasSource) todos = source;
    if (todo) todos.push({ task: todo.task, completed: todo.completed });
    localStorage.setItem(keys.todos, JSON.stringify(todos));
}

function showLocalTodo(){
    todoList.innerHTML = '';
    filter.value = keys.all;
    const todos = getLocalTodos();
    todos.forEach(todo => addTodo(todo))
}

function searchLocalTodoByTask(task){
    const todos = getLocalTodos();
    return todos.filter(todo => todo.task === task)
}

function filterTodosByTask(task){
    const todos = getLocalTodos();
    return todos.filter(todo => todo.task !== task)
}

function updateCompleteAction(completed, task){
    const targetTodo = searchLocalTodoByTask(task)[0];
    const todos = filterTodosByTask(task);
    targetTodo.completed = completed;
    setLocalTodo(targetTodo, true, todos);
}

function removeLocalTodo(task){
    const todos = filterTodosByTask(task);
    setLocalTodo(false, true, todos);
}