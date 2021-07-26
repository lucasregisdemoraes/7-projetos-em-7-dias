let digital = document.querySelector('.digital')
let p_s = document.querySelector('.p_s')
let p_m = document.querySelector('.p_m')
let p_h = document.querySelector('.p_h')

// ou retun time < 10 ? `0${time}` : time
function fixTime(time) {
    if (time < 10) {
        return `0${time}`
    } else {
        return time
    }
}

function updateTime() {
    let now = new Date()
    let hours = now.getHours()
    let min = now.getMinutes()
    let seg = now.getSeconds()

    digital.innerHTML = `${fixTime(hours)}:${fixTime(min)}:${fixTime(seg)}`

    let s_deg = (360 / 60 * seg) - 90
    let m_deg = (360 / 60 * min) - 90
    let h_deg = (360 / 12 * hours) - 90

    p_s.style.transform = `rotate(${s_deg}deg)`
    p_m.style.transform = `rotate(${m_deg}deg)`
    p_h.style.transform = `rotate(${h_deg}deg)`
}

setInterval(updateTime, 1000)
updateTime()