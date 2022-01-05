// --- select ---

let $ = document

const inputNewTodo = $.querySelector('.input-add-new-todo');
const addNewTodo = $.querySelector('.add-todo');
const close = $.querySelector('.close');
const modal = $.querySelector('.modal');
const downMassage = $.querySelector('.down-masage')
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


// ---- function ----

let allCover = [
    'images/cover1.svg',
    'images/cover3.svg',
    'images/cover4.svg',
    'images/cover5.svg',
    'images/cover6.svg'
]

let isDo = true

let randomimage = Math.floor(Math.random() * allCover.length)

image.setAttribute('src', allCover[randomimage])


function addNewTodoItem(newTodoValue) {
    // create new todo
    let newItemTodo = $.createElement('div');
    let newtextItem = $.createElement('p');
    let IconBox = $.createElement('div')
    let newIconItemDoIt = $.createElement('i')

    let newIconItemClose = $.createElement('i');

    // delete item
    newIconItemClose.addEventListener('click', function (event) {
        event.target.parentElement.parentElement.remove()

        deleteMassage.classList.add('show-delete')

        setTimeout(function () {
            deleteMassage.classList.remove('show-delete')
        }, 2000)

        setTimeout(function () {

            if (boxTodoList.innerHTML === '') {
                image.style.display = 'block';
                textNoTodo.style.display = 'block';
            }
        
        }, 600)
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

    newIconItemDoIt.addEventListener('click', function () {

        if (isDo) {
            newItemTodo.style.background = '#009918'
            newtextItem.style.cssText = 'color : #fff;text-decoration : line-through;'
            newIconItemDoIt.style.color = '#fff'
            newIconItemClose.style.color = '#fff'

            downMassage.classList.add('show-massage')

            setTimeout(function () {
                downMassage.classList.remove('show-massage')
            }, 2000)

            isDo = false

        } else {

            newItemTodo.style.background = '#fff'
            newtextItem.style.cssText = 'color : #000;'
            newIconItemDoIt.style.color = '#009918'
            newIconItemClose.style.color = '#ff4800'

            isDo = true
        }
    })
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

function loadThemeFromLocalStorage() {
    let themeLoad = localStorage.getItem('theme')

    document.documentElement.style.setProperty('--main-color', themeLoad)
}

themeImage.addEventListener('click', openPalleteTheme)
closePallete.addEventListener('click', closePalleteColor)
window.addEventListener('load', loadThemeFromLocalStorage)