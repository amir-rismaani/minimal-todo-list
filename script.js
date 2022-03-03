// selectors
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('.todo__list');
const addButton = document.querySelector('#add-todo');
const deleteButtons = document.querySelectorAll('.delete');
const doneButtons = document.querySelectorAll('.done');

// event listener
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", action);


// functions
function addTodo(event){
    event.preventDefault();
    const todoItem = document.createElement("div");
    todoItem.classList.add('item', 'flex', 'justify-between');
    const todoHtmlContent = `
    <div class="item__title">${todoInput.value}</div>
    <div class="item__action flex align-center">
        <i class="icon done fa-solid fa-check" title="انجام"></i>
        <i class="icon edit fa-regular fa-pen-to-square" title="ویرایش"></i>
        <i class="icon delete fa-regular fa-trash-can" title="حذف"></i>
    </div>
    `;

    todoItem.innerHTML = todoHtmlContent;
    todoList.appendChild(todoItem);
    todoInput.value = ""
}

function action(event){
    const target = event.target;
    const actionItemElement = target.parentElement;
    const classList = target.classList;

    if(classList.contains('done')){
        actionItemElement.parentElement.classList.toggle('completed');
    } else if(classList.contains('delete')){
        actionItemElement.parentElement.remove()
    }
}