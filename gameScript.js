const settings = new settingsClass("#settingsContainer", "#name", "#hardmode", "#fps", "#fpsCounter");
const gameCanvas = new canvasClass("#gameCanvas", settings.framesPerSecond, settings.speedMultiplier);
const canvasElement = $("#gameCanvas");

let gameStarted = false;

const startButton = $("#startGame");
const settingsButton = $("#settings");
const closeSettingsButton = $("#closeSettings");

let score = 0;
let dbScores;
let scoreDivShowing = false;
const scoreButton = $("#scores");
const scoreDisplay = $("#score");
const closeScoresButton = $("#closeScores");
const scoreDiv = $("#scoreContainer");
const scoreboard = $("#scoreboard");
const gamemodeText = $("#gamemode");

let intervalID;

scoreDiv.hide();

scoreButton.on("click", () => {
    if (!gameStarted  && !settings.divElementShowing) {
        if (!scoreDivShowing) {
            return showScores();
        }
        return hideScores();
    }
});

closeScoresButton.on("click", () => {
    hideScores();
});

function renderScoreboard() {
    gamemodeText.text("Slower ball");
    if (settings.isHardmode) {
        gamemodeText.text("Faster ball");
    }
    scoreboard.empty();
    let nameData;
    let name;
    let score;
    dbScores.forEach((scoreArray) => {
        nameData = scoreArray[0].split("_");
        nameData.pop();
        name = nameData.join("_");
        score = scoreArray[1];

        const entry = document.createElement("div");
        entry.classList.add("entry");
        entry.textContent = name;
        const entryScore = document.createElement("div");
        entryScore.textContent = score;
        entryScore.classList.add("entryScore")
        entry.append(entryScore);
        scoreboard.append(entry);
    });
}

function showScores() {
    const data = window.getScores(settings.isHardmode);
    dbScores = Object.entries(data).sort((a, b) => b[1] - a[1]);
    //console.log(dbScores);
    renderScoreboard();
    scoreDiv.fadeIn(200);
    scoreDivShowing = true;
}

function hideScores() {
    scoreDiv.fadeOut(200);
    scoreDivShowing = false;
}

settingsButton.on("click", () => {
    if (!gameStarted && !scoreDivShowing) {        
        if (!settings.divElementShowing) {
            return settings.showDiv();
        }
        settings.hideDiv();
        gameCanvas.updateSettings(settings.framesPerSecond, settings.speedMultiplier);
    }
});

closeSettingsButton.on("click", () => {
    settings.hideDiv();
    gameCanvas.updateSettings(settings.framesPerSecond, settings.speedMultiplier);
});

$(window).on("resize", () => {
    gameCanvas.resizeCanvas($(window).width(), $(window).height());
});

canvasElement.on("mousedown", (event) => {
    if (gameStarted) {
        gameCanvas.startClick(event.offsetX, event.offsetY);
    }
});

canvasElement.on("mousemove", (event) => {
    if (gameStarted) {
    gameCanvas.moveMouse(event.offsetX, event.offsetY);
    }
});

canvasElement.on("mouseup", () => {
    if (gameStarted) {
        gameCanvas.endClick();
    }
});

startButton.on("click", () => {
    if (settings.divElementShowing || scoreDivShowing) {
        return;
    }
    if (!gameStarted) {
        return gameStart();
    }
    gameLose();
    gameCanvas.clearCanvas();
});


function gameStart() {
    gameStarted = true;
    startButton.text("End game");
    gameCanvas.clearLine();
    gameCanvas.newLevel();
    intervalID = setInterval(() => {
        gameCanvas.physics();
        //gameCanvas.physics();   //if i call physics twice it appears smoother on render?
        gameCanvas.render();
        if (!gameStarted) {
            gameCanvas.clearCanvas();
        }
    }, 1000 / settings.framesPerSecond);
}
    
function gameWin() {
    score += 1;
    renderScore();
    gameCanvas.newLevel();
}

function gameLose() {
    window.uploadScore(settings.playername, score, settings.isHardmode);
    gameStarted = false;
    clearInterval(intervalID);
    startButton.text("Start game");
    score = 0;
    renderScore();
}

function renderScore() {
    scoreDisplay.text(score);
}