'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}

// createdAt:getTimeCreated(),
// importance: importance
function renderTodos() {
    var todos = getTodos();
    var strHtmls = todos.map(function (todo) {
        var timeStamp = todo.createdAt;
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')">
                   <div><span class="chore">${todo.txt}</span> <span class="importance"> ${todo.importance} </span></div>
                    <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)"> ✖ </button>
                </li>`;
    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilterDisplay(statusFilter) {
    setFilterDisplay(statusFilter);
    render();
}


function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    var elImportance = document.querySelector('#impotance');
    var importance = elImportance.value;
    console.log(newTodoTxt, importance);
    if (newTodoTxt.length > 0 && importance >= 1 && importance <= 3) addTodo(newTodoTxt, importance);
    else return;
    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    elImportance.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    var confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
        deleteTodo(todoId);
        render();
        onEmptyTodo();
    } else {
        return ;
    }
}

function onEmptyTodo() {
    var todos = getTodos();
    if (todos.length === 0) {
        var eltodoContainer = document.querySelector('.todo-list');
        eltodoContainer.innerHTML = 'No todos / No Active Todos, No Done Todos';
    }
}