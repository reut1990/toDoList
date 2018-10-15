// fix the dividing between funcs. set onSet, get!!!!!!!!!!!!!!!!!!!!!!!!!!!
'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML', 2), createTodo('Practice CSS', 3)]
}
function createTodo(txt, importance) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: getTimeCreated(),
        importance: +importance,
        timestamp: Date.now()
    }

}


function getTodos() {
    return gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}

function orderedByTXT(sortType) {
    console.log('sort by text');
    gTodos.sort(function (a, b) {
        var strOne = a[sortType].toLowerCase();
        var strTwo = b[sortType].toLowerCase();
        if (strOne < strTwo) {
            return -1;
        }
        if (strOne > strTwo) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    console.log(gTodos);
    render();
}

function orderedByNumType(sortType) {
    gTodos.sort(function (a, b) {
        return a[sortType] - b[sortType];
    });
    render();
}
function todosOrdered(sortType) {
    if (sortType === 'txt') orderedByTXT(sortType);
    else orderedByNumType(sortType);
}


function addTodo(todoTxt, importance) {
    var doItem = createTodo(todoTxt, importance);
    gTodos.unshift(doItem);
    saveToStorage(KEY_TODOS, gTodos);

}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilterDisplay(statusFilter) {
    gTodosFilter = statusFilter;
}


function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

