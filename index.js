const dom = {
    testTheme: document.getElementById('test-theme'),
    questionNumber: document.getElementById('question-number'),
    questionBlock: document.getElementById('question-block'),
    testImg: document.getElementById('test-img'),
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    btn: document.getElementById('btn'),
    testStatus: document.getElementById('test-status'),
    testResult: document.getElementById('test-result'),
}

// функция рандомной сортировки элемента массива

function randomArray(arr,count) {
    let randomArr = []
    while(arr.length && randomArr.length < count){
        const maxIdx = arr.length-1
        const randomIdx = Math.round(Math.random() * maxIdx)  
        const catQuestion = arr.splice(randomIdx,1)
        randomArr = randomArr.concat(catQuestion)  
    }
    return randomArr 
}

const newQuestionArr = randomArray(data.questions,10)
let questionIdx = 1

// функция вывода вопроса



//функция вывода вариантов ответа
function renderAnswers(answers, rightAnswerNumber){
    const answersHTML = []
    for(let i = 0; i < answers.length; i++){
        if(i+1 === rightAnswerNumber){
            answersHTML.push(`<div class="test__answer" data-valid>${answers[i]}</div>`)
        }else{
            answersHTML.push(`<div class="test__answer">${answers[i]}</div>`)
        }
    }

    dom.answers.innerHTML = answersHTML.join('')
}

const answers = newQuestionArr[0].answers
const rightAnswer = newQuestionArr[0].rightAnswer
let isSelectAnswer = false

//отрисовка вопросов с ответами
function renderQuestionWithAnswers(data, questionNumber){
    const {answers, rightAnswer} = data
    dom.questionNumber.innerHTML = questionNumber
    dom.question.innerHTML = data.question
    renderAnswers(answers, rightAnswer)
    blockButton(true)
}

renderQuestionWithAnswers(newQuestionArr[0],1)
let rightOtvet = 0
//отслеживание клика по кнопке
dom.btn.onclick = () => {
    const question = newQuestionArr[questionIdx]
    const questionNumber = questionIdx + 1
    const nextQuestion = newQuestionArr[questionNumber]
    if(question){    
        renderQuestionWithAnswers(question, questionNumber)
        questionIdx++
        isSelectAnswer = !isSelectAnswer
        if(nextQuestion === undefined){
            changeButton()
        }  
    } else {
        renderResult()

    }
}

//отслеживаем клик по ответу
dom.answers.onclick = (event) => {
    const isAnswerClick = event.target.classList.contains('test__answer')
    if(isAnswerClick && !isSelectAnswer){
        renderAnswersStatus(event.target)
        isSelectAnswer = !isSelectAnswer
        blockButton(false)
    }
}

function renderAnswersStatus(answer){
   const isValid = answer.dataset.valid !== undefined
   if (isValid){
       answer.classList.add('valid')
       rightOtvet++
   } else {
       const validAnswer = answer.parentNode.querySelector('[data-valid]')
       answer.classList.add('invalid')
       validAnswer.classList.add('valid')
   }
}
//блок кнопки
function blockButton (isDisabled){
    if(isDisabled){
        dom.btn.classList.add('disable')
    } else{
        dom.btn.classList.remove('disable')
    }
}

//изменение кнопки
function changeButton() {
    dom.btn.innerHTML = 'Посмотреть результат'
    dom.btn.dataset.result = true
}
//трансформация в финальный экран
function renderResult(){
    dom.questionBlock.style.display = 'none'
    dom.answers.style.display = 'none'
    dom.btn.style.display = 'none'
    dom.testImg.style.display = 'inline'
    dom.testStatus.style.display = 'inline-block'
    dom.testTheme.innerHTML = 'Ваш результат:'
    wellDoneAnswer(rightOtvet)

}

//подсчет правильных ответов
function wellDoneAnswer(answer){
    if(answer > 8){
        dom.testImg.style.backgroundImage = 'url(../images/kakein.gif)'
        dom.testStatus.innerHTML = 'Ваши знания похвальны, как язык Какёина Нориаки'

    } else if(answer <= 8 && answer > 6){
        dom.testImg.style.backgroundImage = 'url(../images/yare.gif)'
        dom.testStatus.innerHTML = 'Джотаро негодует, но и так сойдет'

    } else{
        dom.testImg.style.backgroundImage = 'url(../images/muda.gif)'
        dom.testStatus.innerHTML = 'Вы получили MUDA MUDA MUDA MUDA от DIO'

    }
}







