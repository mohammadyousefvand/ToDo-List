// --- select ---
let $ = document

const inputNewTodo = $.querySelector('.input-add-new-todo');
const addNewTodo = $.querySelector('.add-todo');
const close = $.querySelector('.close');
const modal = $.querySelector('.modal');
const doneMassage = $.querySelector('.down-masage')
const deleteMassage = $.querySelector('.delete')
const image = $.querySelector('.cover');
const textNoTodo = $.querySelector('.no-todo-text');
const boxTodoList = $.querySelector('.list-todo');
const inputmain = $.querySelector('.input-main');
const submit = $.querySelector('.submit');
const themeImage = $.querySelector('.theme')
const palletColor = $.querySelector('.pallet-theme')
const closePallete = $.querySelector('.close-pallet')
const buttonColor = $.querySelectorAll('.btn')
const clearAll = $.querySelector('.clear-all')

arrayTodo = []

// Random Image Background
let allCover = [
    'images/cover1.svg',
    'images/cover3.svg',
    'images/cover4.svg',
    'images/cover5.svg',
    'images/cover6.svg'
]

let randomimage = Math.floor(Math.random() * allCover.length)
image.setAttribute('src', allCover[randomimage])

// ---- function ----

//Create New Todo And Push In Array
function addNewTodoItem(newTodo) {

    let newTodoObject = {
        id: arrayTodo.length + 1,
        title: newTodo,
        complated: false
    }

    arrayTodo.push(newTodoObject)

    setlocalUpdated(arrayTodo)
    generatorDom(arrayTodo)
}

//Update localStorage 
function setlocalUpdated(arrayTodo) {
    localStorage.setItem('Todos', JSON.stringify(arrayTodo))
}

//Create Dom Element From Array
function generatorDom(arrayTodo) {

    boxTodoList.innerHTML = ''

    let newItemTodo, newtextItem, IconBox, newIconItemDoIt, newIconItemClose

    arrayTodo.forEach(function (todo) {
        // create new todo
        newItemTodo = $.createElement('div');
        newtextItem = $.createElement('p');
        IconBox = $.createElement('div')
        newIconItemDoIt = $.createElement('i')
        newIconItemClose = $.createElement('i');

        newItemTodo.setAttribute('class', 'item-todo-list');
        newtextItem.setAttribute('class', 'text');
        newtextItem.innerHTML = todo.title
        IconBox.setAttribute('class', 'iconbox')
        newIconItemClose.setAttribute('class', 'fa fa-times-circle closeitem');
        newIconItemClose.addEventListener('click', function (event) {

            //Animation When Delete Todo
            newItemTodo.classList.add('close-Todos')

            setTimeout(function () {
                removeItemTodo(todo.id)
            }, 600)
        })

        newIconItemDoIt.setAttribute('class', 'fa fa-check-circle do-it')
        newIconItemDoIt.setAttribute('onclick', 'complateTodosHandler(' + todo.id + ')')
        IconBox.append(newIconItemDoIt, newIconItemClose)
        newItemTodo.append(newtextItem, IconBox)
        newItemTodo.style.display = 'flex'
        boxTodoList.append(newItemTodo);

        //Check Todo In Dom
        checkAnyTodos()

        //Check Complate Todo And Set Style For Box
        if (todo.complated == true) {
            newItemTodo.classList.add('active')
            newIconItemDoIt.classList.add('active')
            newIconItemClose.classList.add('active')
            newtextItem.style.textDecoration = 'line-through'

            //Show modal Massege 
            doneMassage.classList.add('show')

            //Hide Modal Massege After 2/s
            setTimeout(function () {
                doneMassage.classList.remove('show')
            }, 2000)
        }
    })
}

//Check Any Todo In Dom 
function checkAnyTodos() {

    if (boxTodoList.innerHTML == '') {
        clearAll.style.display = 'none'
        image.style.display = 'block';
        textNoTodo.style.display = 'block';
    } else {
        clearAll.style.display = 'block'
        image.style.display = 'none';
        textNoTodo.style.display = 'none';
    }
}
//Complate Todo After Click
function complateTodosHandler(todosId) {
    arrayTodo.forEach(function (todo) {
        if (todosId == todo.id) {
            todo.complated = !todo.complated
        }
    })
    //Update
    setlocalUpdated(arrayTodo)
    generatorDom(arrayTodo)
}

//Remove Todo In Array
function removeItemTodo(todosId) {

    let localRemoveUpdate = JSON.parse(localStorage.getItem('Todos'))

    arrayTodo = localRemoveUpdate

    let indexRemove = arrayTodo.findIndex(function (todo) {
        return todosId == todo.id
    })

    arrayTodo.splice(indexRemove, 1)

    //Show Modal Massege
    deleteMassage.classList.add('show')

    //Hide Modal Massege
    setTimeout(function () {
        deleteMassage.classList.remove('show')
    }, 2000)

    //Update
    generatorDom(arrayTodo)
    checkAnyTodos()
    setlocalUpdated(arrayTodo)
}

//Delete All Todo From Array & Dom & LocalStorage
function clearallTodos() {

    //Add Animation Style For Delete
    boxTodoList.classList.add('close-Todos')
    //Show Massege Delete
    deleteMassage.classList.add('show')

    setTimeout(function () {
        arrayTodo = []
        localStorage.removeItem('Todos')
        generatorDom(arrayTodo)
        checkAnyTodos()

        //Remove Animation Style For Delete
        boxTodoList.classList.remove('close-Todos')
    }, 600)

    //Hide Massege
    setTimeout(function () {
        deleteMassage.classList.remove('show')
        
    }, 2000)
}

// ------ Event ------

addNewTodo.addEventListener('click', function () {
    inputNewTodo.classList.toggle('active')
    inputmain.focus()
});

close.addEventListener('click', function () {
    inputNewTodo.classList.toggle('active')
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) {
        inputNewTodo.classList.remove('active')
    }
});

submit.addEventListener('click', function () {
    let newTodoValue = inputmain.value.trim();

    if (newTodoValue) {
        inputmain.value = ''
        addNewTodoItem(newTodoValue)
    } else {

        // modal Eror
        modal.classList.add('show')
        setTimeout(function () {

            modal.classList.remove('show')

        }, 4000)
    }
});
inputmain.addEventListener('keydown', function (event) {
    let newTodoValue = event.target.value.trim();

    if (event.key === 'Enter') {
        event.preventDefault()

        if (newTodoValue) {

            inputmain.value = ''
            addNewTodoItem(newTodoValue)

        } else {
            modal.classList.add('show')

            setTimeout(function () {

                modal.classList.remove('show')

            }, 4000)
        }
    }
});

//Theme Color And Save In localStorage
function openPalleteTheme() {
    palletColor.classList.add('show-pallet')
}

function closePalleteColor() {
    palletColor.classList.remove('show-pallet')
}

buttonColor.forEach(function (item) {
    item.addEventListener('click', function (event) {
        let choseColor = event.target.dataset.color

        document.documentElement.style.setProperty('--main-color', choseColor)
        localStorage.setItem('theme', choseColor)
    })
})

//Recavery All Data From Local
function loadThemeFromLocalStorage() {
    // Theme and Todo
    let themeLoad = localStorage.getItem('theme')

    document.documentElement.style.setProperty('--main-color', themeLoad)

    let localRecovery = JSON.parse(localStorage.getItem('Todos'))

    if (localRecovery) {
        arrayTodo = localRecovery
    } else {
        arrayTodo = []
    }

    //Update
    generatorDom(arrayTodo)

    //Hide Massege After Recavery
    doneMassage.classList.remove('show')
}

themeImage.addEventListener('click', openPalleteTheme)
closePallete.addEventListener('click', closePalleteColor)
window.addEventListener('load', loadThemeFromLocalStorage)
clearAll.addEventListener('click', clearallTodos)