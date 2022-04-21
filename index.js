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
const newArr = randomArray(data.questions)
console.log(newArr)