document.body.addEventListener('keyup', event => {
    let key = event.code.toLowerCase()
    playSound(key)
})

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value
    if (song !== '') {
        let songArray = song.split('')
        playComposition(songArray)
    }
})

function playSound(sound) {
    let soundElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if (soundElement) {
        soundElement.currentTime = 0
        soundElement.play()
    }

    if (keyElement) {
        keyElement.classList.add('active')
        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 300)
    }
}

function playComposition(songArray) {
    let wait = 0

    for (let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait)
        wait += 250
    }
}