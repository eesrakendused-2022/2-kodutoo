import engine from "./chessEngine.js"
import engineX from "./startChess.js"
import ajaxHandler from "./ajaxHandler.js";

var ajax = new ajaxHandler();
var timer = ms => new Promise(res => setTimeout(res, ms));
var unreasonable = 100000;
var winBlack = false;
var winWhite=  false;
var blackName;
var whiteName;

console.log(engine.eatCounter, engineX.eatCounter);
for(var i=0; i<unreasonable; i++){
    $("#newInit").click(function(){
        location.reload();
    })
    $("#init").click(function(){
        blackName = $("#nameValB").val();
        whiteName = $("#nameValW").val();
        ajax.playerBlack = blackName;
        ajax.playerWhite = whiteName;
        ajax.startTimer();
        $("#nameBlack").html("<p>Player name: "+blackName+"</p>");
        $("#nameWhite").html("<p>Player name: "+whiteName+"</p>");
        $("#names").hide();
    })
    testMovement();
    readWriteScores();
    showturn();
    if(winBlack == false && winWhite == false){
        testCheck(i);
    } else {

    }
    await timer(200)
}

function testMovement(){
    if(engine.didMove){
        engine.didmove = true;
        engineX.didMoveX = false;
        engine.playerPause = true;
        engineX.playerPause =false;
    }
    if(engineX.didMoveX){
        engineX.didMoveX = false;
        engine.didMove = false;
        engineX.playerPause = true;
        engine.playerPause =false;
    }
}

function readWriteScores(){
    $("#scoreB").html("<p>Enemy pieces captured: "+engineX.eatCounter+"</p>");
    $("#scoreW").html("<p>Enemy pieces captured: "+engine.eatCounter)+"</p>";
}

function showturn(){
    if(engine.playerPause == true){
        $("#timer").html("Blacks turn");
    } else{
        $("#timer").html("Whites turn");
    }
}


function testCheck(i){
    if($("#playArea").find("#kingBlackE").length==0){
        console.log("VALGE VÕITIS!");
        ajax.endTimer(i);
        ajax.winner = "White";
        ajax.blacksCaptured = engine.eatCounter;
        ajax.whitesCaptured = engineX.eatCounter;
        ajax.saveResults();
        $("#gameOver").css({
            "animation" : "1s whooshThePiece",
            "display" : "flex"
        })
        winWhite = true;
    } else if($("#playArea").find("#kingWhiteE").length==0){
        console.log("MUST VÕITIS!");
        ajax.endTimer(i);
        ajax.winner = "Black";
        ajax.blacksCaptured = engine.eatCounter;
        ajax.whitesCaptured = engineX.eatCounter;
        ajax.saveResults();
        $("#gameOver").css({
            "animation" : "1s whooshThePiece",
            "display" : "flex"
        })
        winBlack = true;
    }
}
