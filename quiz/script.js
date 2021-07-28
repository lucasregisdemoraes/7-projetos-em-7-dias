// Initial Data
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetQuiz)

// Functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question

        let options = ""
        for (let i in q.options) {
            options += `<div class="option" data-op="${i}"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = options
        document.querySelectorAll('.option').forEach(e => {
            e.addEventListener('click', optionClickEvent)
        })

    } else {
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let selectedOption = parseInt(e.target.getAttribute('data-op'))
    if (selectedOption === questions[currentQuestion].answer) {
        correctAnswers++
    }
    currentQuestion++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)
    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = "Ainda pode melhorar"
        document.querySelector('.scorePct').style.color = "#FF0000"
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = "Ainda pode melhorar"
        document.querySelector('.scorePct').style.color = "#FFFF00"
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = "Ainda pode melhorar"
        document.querySelector('.scorePct').style.color = "#0D630D"
    }

    document.querySelector('.scorePct').innerHTML = `Você acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = "100%"
}

function resetQuiz() {
    currentQuestion = 0
    correctAnswers = 0
    showQuestion()
}