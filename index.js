const dom = {
    testTheme: document.getElementById('test-theme'),
    testNumber: document.getElementById('test-number'),
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    btn: document.getElementById('btn'),
}

function randomArray(arr,count) {
    let randomArr =[]
    while(arr.length && randomArr.length < count){
        const maxIdx = arr.length - 1
        const randomIdx = Math.round(Math.random() * maxIdx)
        const cutQuestion = arr.splice(randomIdx, 1)
        randomArr = randomArr.concat(cutQuestion)
    }
    return randomArr
}

const newQuestionsArr = randomArray(data.questions,5)
let questionIdx = 0
let isSelectAnswer = false


function renderAnswers(answers,rightAnswerNumber) {
    const answersHTML = []

    for(let i = 0; i < answers.length; i++) {
        if (i + 1 === rightAnswerNumber) {
            
            answersHTML.push(`<div class="test__answer" data-valid>${answers[i]}</div>`)
        } else {
            
            answersHTML.push(`<div class="test__answer" >${answers[i]}</div>`)
        }
    }
    dom.answers.innerHtml = answersHTML.join('')
}

const answers = newQuestionsArr[0].answers

const rightAnswerNumber = newQuestionsArr[0].rightAnswer




function renderQuestionWithAnswers(data, questionNumber) {
    const { answers, rightAnswer } = data
    dom.testNumber.innerHTML = questionNumber
    dom.question.innerHTML = data.question
    renderAnswers(answers, rightAnswer)
}

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
    console.log(event.target);
    const isAnswerclick = event.target.classList.contains('test__answer')
    console.log(isAnswerclick)
    if (isAnswerclick && !isSelectAnswer) {
        renderAnswersStatus(event.target)
        isSelectAnswer = !isSelectAnswer
    }
}
function renderAnswersStatus (answer) {
    const isValid = answer.dataset.valid !== undefined;
    if (isValid) {
        answer.classList.add('valid')
    } else {
        const validAnswer = answer.parentNode.querySelector(['data-valid']);
        answer.classList.add('invalid');
        validAnswer.classList.add('valid');
    }
}


