
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML', 2), createTodo('Practice CSS', 3)]
}

function createTodo(txt, importance) {
    var timeStamp =  Date.now();
    return {
        id: makeId(),
        txt: txt,
        importance,
        timeCreated: timeStamp,
        isDone: false
    }
}

function todosOrdered(sortType) {
    if (sortType === 'txt') {
        console.log('txt', sortType);
        gTodos.sort((a, b) => {
            var txtA = a.txt.toUpperCase(); // ignore upper and lowercase
            var txtB = b.txt.toUpperCase(); // ignore upper and lowercase
            if (txtA < txtB) {
                return -1;
            }
            if (txtA > txtB) {
                return 1;
            }

            // txts must be equal
            return 0;
        });
    } else if (sortType === 'importance') {
        gTodos.sort((a, b) => {
            return a.importance - b.importance;
        });
    } else {
        gTodos.sort((a, b) => {
            console.log('time created', sortType, a.timeCreated);
           

            return a.timeCreated - b.timeCreated;
        });
    }


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

function getTodos() {
    return gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

