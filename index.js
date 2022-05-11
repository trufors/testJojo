const dom = {
    testTheme: document.getElementById('test-theme'),
    questionNumber: document.getElementById('question-number'),
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    btn: document.getElementById('btn'),
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

const newQuestionArr = randomArray(data.questions,5)
let questionIdx = 0

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
}

renderQuestionWithAnswers(newQuestionArr[0],1)

//отслеживание клика по кнопке
dom.btn.onclick = () => {
    const question = newQuestionArr[questionIdx]
    const questionNumber = questionIdx + 1
    if(question){    
        renderQuestionWithAnswers(question, questionNumber)
        questionIdx++
        isSelectAnswer = !isSelectAnswer
    } else {
        alert('вопросы закончились')
    }
}

//отслеживаем клик по ответу
dom.answers.onclick = (event) => {
    const isAnswerClick = event.target.classList.contains('test__answer')
    if(isAnswerClick && !isSelectAnswer){
        renderAnswersStatus(event.target)
        isSelectAnswer = !isSelectAnswer

    }
}

function renderAnswersStatus(answer){
   const isValid = answer.dataset.valid !== undefined
   if (isValid){
       answer.classList.add('valid')
   } else {
       const validAnswer = answer.parentNode.querySelector('[data-valid]')
       answer.classList.add('invalid')
       validAnswer.classList.add('valid')
   }
}







