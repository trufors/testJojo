const dom = {
    testTheme: document.getElementById('test-theme'),
    testNumber: document.getElementById('test-number'),
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    btn: document.getElementById('btn'),
}
const randomArray = (arr,count) => {
    let randomArr =[]
    while(arr.length && randomArray.length < count){
        const maxIdx = arr.length - 1
        const randomIdx = Math.round(Math.random() * maxIdx)
        const cutQuestion = arr.splice(randomIdx, 1)
        randomArr = randomArr.concat(cutQuestion)
    }
    return randomArr
}



const renderAnswers = (answers,rightAnswerNumber) => {
    const answersHTML = []

    for(let i = 0; i < answers.length; i++) {
        if (i + 1 === rightAnswerNumber) {
            answersHTML.push(`<div class="test__answer" data-valid>${answers[i]}</div>`)
        } else {
            answersHTML.push(`<div class="test__answer" >${answers[i]}</div>`)
        }
    }
    return answersHTML.join('')
}


const renderQuestionWithAnswers = (data, questionNumber) => {
    const {answers, rightAnswer} = data
    dom.testNumber.innerHTML = questionNumber
    dom.question.innerHTML = data.question
    renderAnswers(answers, rightAnswer)
}

const newQuestionsArr = randomArray(data.questions,3)
let questionIdx = 0
let isSelectAnswer = false

const answers = newQuestionsArr[0].answers
const rightAnswerNumber = newQuestionsArr[0].rightAnswer

const answersHTMLString = renderAnswers(answers,rightAnswerNumber)
dom.answers.innerHTML = answersHTMLString

renderQuestionWithAnswers(newQuestionsArr[0],1)

dom.btn.onclick = () => {
    const question = newQuestionsArr[questionIdx]
    const questionNumber = questionIdx + 1
    if(question){
        renderQuestionWithAnswers(question, questionNumber)
        questionIdx++
        isSelectAnswer = !isSelectAnswer      
    } else {
        alert('вопросы закончились')
    }
}
dom.answers.onclick = (event) => {
    const isAnswerclick = event.target.classList.contains('test__answer')
    if (isAnswerclick && !isSelectAnswer) {
        renderAnswersStatus(event.target)
        isSelectAnswer = !isSelectAnswer
    }
} 

const renderAnswersStatus = (answer) => {
    const isValid = answer.dataset.valid !== undefined
    if (isValid) {
        answer.classList.add('valid')
    } else {
        const validdAnswer = answer.parentNode.querySelector(['data-valid'])
        answer.classList.add('invalid')
        validAnswer.classList.add('valid')

    }
}


