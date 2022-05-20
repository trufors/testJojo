const dom = {
    todoText : document.getElementsByClassName('todo__text'),
    todoElem : document.getElementById('todo-elem'),
    todoInput : ()=>document.getElementById('todo-input'),
    todoContainer : document.getElementById('todo-container'),
}
let huy = 1

//создание чекбокса
const createCheckbox = (elem,num) => {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('todo__checkbox')
    checkbox.addEventListener('change',function(event){
        if(event.target.checked){
            event.target.disabled = true
            const text = document.querySelector(`.todo_text${num}`)
            text.classList.add('complete__todo')

        }

    })
    elem.appendChild(checkbox)
    
}

//создание текста
const createText = (value,elem) => {
    let text = document.createElement('p')
    text.innerHTML = value
    text.classList.add('todo__text')
    text.classList.add(`todo_text${huy}`)
    elem.appendChild(text)


}
//создание нового чекбокса с текстом
const createElement = (value,elem) => {
    let element = document.createElement('div')
    element.classList.add('todo__elem')
    elem.appendChild(element)
    createCheckbox(element,huy)
    createText(value,element)
    huy++
}
//работа с инпутом
dom.todoInput().onkeydown = (event) => {
    
    if (event.keyCode === 13){
        createElement(dom.todoInput().value,dom.todoContainer)
        dom.todoInput().value = ''
        

    }
}
const todoCheckbox = document.getElementsByClassName('todo__checkbox')

//отслеживание нажатого чекбокса
for(let checkbox of todoCheckbox){
    checkbox.addEventListener('checked',(event) => {
        console.log(event.target)
        event.target.nextSibling().classList.add('complete__todo')
    })
}

