document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()
    let input = document.querySelector('#searchInput').value
    if (input !== '') {
        clearInfo()
        showMessage('carregando...')

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid="--- chave da API ---"&units=metric&lang=pt_br`)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                tempInfo: json.main.temp,
                tempIcon: json.weather[0].icon,
                windInfo: json.wind.speed,
                windDeg: json.wind.deg,
            })
        } else {
            clearInfo()
            showMessage('Cidade não encontrada')
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showMessage('')
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.tempInfo} <sup>ºC</sup>`
    document.querySelector('.temp img').setAttribute('class', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoInfo').innerHTML = `${json.windInfo} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
    document.querySelector('.resultado').style.display = 'none'
    showMessage('')
}

function showMessage(msg) {
    document.querySelector('.aviso').innerHTML = msg
}