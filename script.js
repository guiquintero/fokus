const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const button = document.querySelectorAll('.app__card-button');
const musicInput = document.querySelector('#alternar-musica');
const playPauseButton = document.querySelector('.app__card-primary-butto-icon');
const startPauseBtn = document.querySelector('#start-pause')
const textStartPauseBtn = document.querySelector('#start-pause span')
const timer = document.querySelector('#timer')

const song = new Audio('./sons/luna-rise-part-one.mp3');

const playSong = new Audio('./sons/play.wav')
const pauseSong = new Audio('./sons/pause.mp3')
const finishSong = new Audio('./sons/beep.mp3')


song.loop = true;


let elapsedTime = 1500;
let intevalId = null;

musicInput.addEventListener('change', () => {
    if(song.paused){
        song.play()
    } else{
        song.pause()
    }
})

focoBtn.addEventListener('click', () => {
    elapsedTime = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    elapsedTime = 300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    elapsedTime = 900
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')

})

function alterarContexto(contexto){
    showTime()
    button.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
    }
}

const countdown = () =>{
    if(elapsedTime<=0){
        finishSong.play()
        playPauseButton.setAttribute('src', `./imagens/play_arrow.png`)
        textStartPauseBtn.textContent = "Começar"
        zerar()
        return
    }
    elapsedTime -= 1;
    showTime()
}

startPauseBtn.addEventListener('click', startPause)

function startPause(){
    if(intevalId){
        playPauseButton.setAttribute('src', `./imagens/play_arrow.png`)
        textStartPauseBtn.textContent = "Começar"
        pauseSong.play()
        zerar()
        return
    }
    playSong.play()
    playPauseButton.setAttribute('src', `./imagens/pause.png`)
    textStartPauseBtn.textContent = "Pausar"
    intevalId = setInterval(countdown, 1000)
}

function zerar(){
    clearInterval(intevalId);
    intevalId = null
}

function showTime(){
    const timeLeft = new Date(elapsedTime * 1000)
    const timeFormated = timeLeft.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})

    timer.innerHTML = `${timeFormated}`
}

showTime()