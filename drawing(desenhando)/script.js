// Initial Data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')

// Events
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', getColor)
})
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mouseup', mouseUpEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
document.querySelector('.clear').addEventListener('click', clearDraw)

// Functions
function getColor(e) {
    let color = e.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.colorArea .color.active').classList.remove('active')
    e.target.classList.add('active')
}

function mouseDownEvent(e) {
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft
    mouseY = e.pageY - screen.offsetTop
}
function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY)
    }
}
function mouseUpEvent() {
    canDraw = false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop
    
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.moveTo(mouseX, mouseY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = currentColor
    ctx.stroke()

    mouseX = pointX
    mouseY = pointY
}

function clearDraw(){
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}