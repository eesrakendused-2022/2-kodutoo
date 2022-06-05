import Engine from './game/engine.js'

let game = new Engine()
localStorage.setItem('gameOn',false)

$('#playButton').click(handlePlayGame)
$('#resetButton').click(handleResetGame)
// $('#submitScoreButton').click(handleSubmitScore)

function handlePlayGame() {
    localStorage.setItem('gameOn',true)
    localStorage.setItem('score','0')
    // $('#submitScoreButton').attr('data-disabled', '')
    $('#submitScoreButton').addClass('disabled')
    game.draw()
}

function handleResetGame() {
    localStorage.setItem('gameOn',false)
    game.reset()
}

window.setInterval(checkGameStatus, 120);

function checkGameStatus() {
    let status = (localStorage.getItem('gameOn') == 'true')
    if (status === true){
        game.move()
    }
}

game.showResults()
