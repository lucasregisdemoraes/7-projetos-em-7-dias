// Initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}
let warning = ''
let player = ''
let playing = false

reset()
// Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

// Functions
function reset() {
    warning = ''
    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'x' : 'o'
    playing = true
    for (let i in square) {
        square[i] = ''
    }

    renderSquare()
    renderInfo()
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }
    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
}

function itemClick(item) {
    if (playing && square[item.target.getAttribute('data-item')] === '') {
        let element = item.target.getAttribute('data-item')
        document.querySelector(`[data-item=${element}]`).innerHTML = player
        square[element] = player
        renderSquare()
        togglePlayer()
    }
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x'
    renderInfo()
}

function checkGame() {
    if (checkWinnerFor('x')) {
        playing = false
        warning = `o "x" venceu!`
    } else if (checkWinnerFor('o')) {
        playing = false
        warning = `o "o" venceu!`
    } else if (fullSquare()) {
        playing = false
        warning = 'Deu empate!'
    }
}

function checkWinnerFor(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in possibilities) {
        let pArray = possibilities[w].split(',')

        let hasWon = pArray.every((option) => {
            if (square[option] === player) {
                return true
            } else {
                return false
            }
        })
        /* =====  Ou  =====
        let hasWon = pArray.every(option => square[option] === player)
        */
        if (hasWon) {
            return true
        }
    }
    return false
}

function fullSquare() {
    for (let i in square) {
        if (square[i] === '') {
            return false
        }
    }
    return true
}