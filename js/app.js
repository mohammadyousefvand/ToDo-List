// --- select ---

let $ = document

let inputNewTodo = $.querySelector('.input-add-new-todo')
let addNewTodo = $.querySelector('.add-todo')

let close = $.querySelector('.close')
let modal = $.querySelector('.modal')
let image = $.querySelector('img')
let textNoTodo = $.querySelector('.no-todo-text')
let ulTodoList = $.querySelector('.list-todo')
let inputmain = $.querySelector('.input-main')
let submit = $.querySelector('.submit')

// ---- function ----

function addNewTodoItem(newTodoValue) {
    // create new todo
    let newliItem = document.createElement('li')
    let newtextItem = document.createElement('p')
    let newIconItem = document.createElement('i')

    // delete item
    newIconItem.addEventListener('click', function (event) {
        event.target.parentElement.remove()
    })
    // image
    image.style.display = 'none'
    textNoTodo.style.display = 'none'


    newliItem.setAttribute('class', 'li-item-todo-list')
    newtextItem.setAttribute('class', 'text')
    newtextItem.innerHTML = newTodoValue
    newIconItem.setAttribute('class', 'fa fa-times-circle closeitem')
    newliItem.append(newtextItem, newIconItem)
    newliItem.style.display = 'flex'
    ulTodoList.append(newliItem)
}

// ------ Event ------

addNewTodo.addEventListener('click', function () {
    inputNewTodo.classList.toggle('active')
})

close.addEventListener('click', function () {
    inputNewTodo.classList.toggle('active')
})


submit.addEventListener('click', function () {
    let newTodoValue = inputmain.value.trim()

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
})
inputmain.addEventListener('keydown', function (event) {
    let newTodoValue = event.target.value.trim()


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
})