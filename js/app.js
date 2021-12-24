// --- select ---

let $ = document

let inputNewTodo = $.querySelector('.input-add-new-todo');
let addNewTodo = $.querySelector('.add-todo');
let close = $.querySelector('.close');
let modal = $.querySelector('.modal');
let downMassage = $.querySelector('.down-masage')
let deleteMassage = $.querySelector('.delete')
let image = $.querySelector('img');
let textNoTodo = $.querySelector('.no-todo-text');
let boxTodoList = $.querySelector('.list-todo');
let inputmain = $.querySelector('.input-main');
let submit = $.querySelector('.submit');

// ---- function ----

let allCover = [
    'images/cover1.svg',
    'images/cover2.svg',
    'images/cover3.svg',
    'images/cover4.svg',
    'images/cover5.svg',
    'images/cover6.svg'
]

let randomimage = Math.floor(Math.random() * allCover.length)

image.setAttribute('src' , allCover[randomimage])


function addNewTodoItem(newTodoValue) {
    // create new todo
    let newItemTodo = $.createElement('div');
    let newtextItem = $.createElement('p');
    let IconBox = $.createElement('div')
    let newIconItemDoIt = $.createElement('i')

    newIconItemDoIt.addEventListener('click' , function () {

        let isDo = false

        if (isDo == false) {
            newItemTodo.style.background = '#009918'
            newtextItem.style.color = '#fff'
            newtextItem.style.textDecoration = 'line-through'
            newIconItemDoIt.style.color = '#fff'
            newIconItemClose.style.color = '#fff'
            isDo = true
        }

        downMassage.classList.add('show-massage')

        setTimeout(function () {
            downMassage.classList.remove('show-massage')
        } ,2000)
    })

    let newIconItemClose = $.createElement('i');

    // delete item
    newIconItemClose.addEventListener('click', function (event) {
        event.target.parentElement.parentElement.remove()

        deleteMassage.classList.add('show-delete')

        setTimeout(function () {
            deleteMassage.classList.remove('show-delete')
        } ,2000)
    });
    // image
    image.style.display = 'none';
    textNoTodo.style.display = 'none';


    newItemTodo.setAttribute('class', 'item-todo-list');
    newtextItem.setAttribute('class', 'text');
    newtextItem.innerHTML = newTodoValue
    IconBox.setAttribute('class', 'iconbox')
    newIconItemClose.setAttribute('class', 'fa fa-times-circle closeitem');
    newIconItemDoIt.setAttribute('class', 'fa fa-check-circle do-it')
    IconBox.append(newIconItemDoIt, newIconItemClose)
    newItemTodo.append(newtextItem, IconBox)
    newItemTodo.style.display = 'flex'
    boxTodoList.append(newItemTodo);
}



// ------ Event ------

addNewTodo.addEventListener('click', function () {
    inputNewTodo.classList.toggle('active')
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