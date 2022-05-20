const dom = {
    todoText : document.getElementsByClassName('todo__text'),
    todoCheckbox : document.getElementsByClassName('todo__checkbox'),
    todoElem : document.getElementById('todo-elem'),
    todoInput : document.getElementById('todo-input'),
    todoContainer : document.getElementById('todo-container'),
}

//создание чекбокса
const createCheckbox = (elem) => {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('todo__checkbox')
    checkbox.addEventListener('checked', function () {
        checkbox.classList.add('complete__todo')
    })
    elem.appendChild(checkbox)
}

//создание текста
const createText = (value,elem) => {
    let text = document.createElement('p')
    text.innerHTML = value
    text.classList.add('todo__text')
    elem.appendChild(text)


}
//создание нового чекбокса с текстом
const createElement = (value,elem) => {
    let element = document.createElement('div')
    element.classList.add('todo__elem')
    elem.appendChild(element)
    createCheckbox(element)
    createText(value,element)
}
//работа с инпутом
dom.todoInput.onkeydown = (event) => {
    
    if (event.keyCode === 13){
        createElement(dom.todoInput.value,dom.todoContainer)
        dom.todoInput.value = ''

    }
}

//отслеживание нажатого чекбокса
for(let checkbox of dom.todoCheckbox){
    checkbox.addEventListener('checked',(event) => {
        console.log(event.target)
        event.target.nextSibling().classList.add('complete__todo')
    })
}
