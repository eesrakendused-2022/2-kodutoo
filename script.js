

$(document).ready(function () {
  
var playerDir = "stop";
var playerSpeed = 5;
var xpos;
var ypos;

var pause = "false";
var gameTickTime = 10;
var timeLapsed;
var endGame;
var numLives;
var level = 1; 
var timeLimit = 30;

$("#start").show().html("START");
$("#lives").hide();
$("#level").hide();
$("#paused").hide();
$("#status").hide();
$("#gameOver").hide();
$("#gameTimer").hide();
$("#gameWin").hide();

var monsterTop = {};
var monsterLeft = {};
var monsterDirY = {};
var monsterDirX = {};
var monsterSpeed = {};


function game_tick() {

    moveMonsters();
    movePlayer(playerDir);

    check_collision();
    check_collision2();

    checkGameStatus();

}

$(document).on("click","#start", function(e) {
    e.preventDefault();

    endGame = "false";

    numLives = 3;
    level = 1;
    timeLapsed = 0;
    $("#gameTimer").html("TIME: " + timeLapsed + "s").show();
    $("#lives").html("LIVES: " + numLives).show();
    $("#level").html("LEVEL: " + level).show();
    $("#status").hide();
    $("#gameOver").hide();
    $("#gameWin").hide();
    $("#start").hide();

    addMonsters();
    addPlayer();
    
    game_tick();
    gameTimer();
});

function gameTimer() {
    $("#gameTimer").html("TIME: " + timeLapsed + "s");
    timeLapsed++;
    if (timeLapsed > timeLimit || pause == "true") {
        window.stop(gameTimer);
    } else {
        window.setTimeout(gameTimer, 1000);
    }
}

function checkGameStatus() {
    if (pause == "true") {
        window.stop(game_tick);
    } else if (endGame == "true" || numLives <= 0 ) {
        window.stop(game_tick);
 
        $("#gameOver").show().html("KAOTASID MÄNGU");
        $("#lives").hide();
        $("#level").hide();
        $("#gameTimer").hide();

        $("#start").show().html("START");
    } else if  (level == 5) {
        $("#gameWin").show().html("VÕITSID MÄNGU");
        window.stop(game_tick);
        $("#gameTimer").hide();
        $("#start").show().html("START");
    } else {
        window.setTimeout(game_tick, gameTickTime);
    }
}

function addPlayer() {
    $("#gameBoard").append("<div id='player'></div>");
    $("#player").html("<img src='img/player.png'/>");
    $("#player").css({ top: 286, left: 350});
}

function addMonsters() {
    $(".monster").remove();

    var numMonsters = level + Math.floor(Math.random()*2);

    for (j=0; j<numMonsters; j++) {
        $("#gameBoard").append("<div class='monster'></div>");
    }

    var i=0;
    $(".monster").each(function(){
        var speedMultiplier = level;
        if (speedMultiplier > 5) { speedMultiplier = 5; }

        $(this).html("<img src='img/zombie.png' />");

        monsterSpeed[i] = 1 + Math.floor(Math.random() *speedMultiplier);
        monsterTop[i] = 310
        monsterLeft[i] = 700

        var setDirY = Math.floor(Math.random()*2);
        var setDirX = Math.floor(Math.random()*2);

        if (setDirY == 0) { monsterDirY[i] = "up"; } else { monsterDirY[i] = "down"; }
        if (setDirX == 0) { monsterDirX[i] = "left"; } else { monsterDirX[i] = "right"; }

        $(this).css({ top: monsterTop[i], left: monsterLeft[i] }).show().addClass("active");

        i = i + 1;
    });
}

function moveMonsters() {
    var i = 0;
    $(".monster").each(function(){
        
        if (monsterLeft[i] > $("#gameBoard").width()-$(this).width()) { monsterDirX[i] = "left";}
        if (monsterLeft[i] < 0) {monsterDirX[i] = "right"; }
        
        if (monsterDirX[i] == "left") { monsterLeft[i] = monsterLeft[i] - monsterSpeed[i]; }
        if (monsterDirX[i] == "right") { monsterLeft[i] = monsterLeft[i] + monsterSpeed[i]; }   
        

        $(this).css({ top: monsterTop[i] , left: monsterLeft[i] });

        i = i + 1;
    });
}    

function check_collision() {
    var newpos = $("#player").position();
    xpos = newpos.left;
    ypos = newpos.top;
    var i = 0;
    $(".monster").each(function(){
        if ($(this).hasClass("active")) {
            if ((xpos + $("#player").width()) >= $(this).position().left && xpos <= ($(this).position().left + $(this).width())
                && ypos >= ($(this).position().top - $("#player").height()) && ypos <= ($(this).position().top + $(this).height())) {

                    $(this).removeClass("active").hide();
                    
                    numLives = numLives - 1;
                    $("lives").html("LIVES: " + numLives);
                    $("#player").css({"top":"286","left":"350"});

                    $("#status").show().html("Aiiii!!");
                    setTimeout(function(){
                        $("#status").hide();
                    }, 500);

                    i = i + 1;
                }
            }
    });

}

function check_collision2() {
    var newpos = $("#player").position();
    xpos = newpos.left;
    ypos = newpos.top;
  
    if (timeLapsed > 20 ) {
            level = level + 1;
            timeLapsed = 0;
            addMonsters();
    
        $("#lives").html("LIVES: " + numLives);
        $("#level").html("LEVEL: " + level);
    }    
}

function movePlayer(playerDir) {
    var pos = $("#player").position();
    xpos = Math.round(pos.left);
    ypos = Math.round(pos.top);
    var newXpos;

    if (playerDir == "stop") {
    }

    if (playerDir == "left") {
        newXpos = xpos - playerSpeed;

        if (newXpos > 0) {
            $("#player").css({left: newXpos});
        } else {
            $("#player").css({left: 0});
        }

    }
    if (playerDir == "right") { 
        newXpos = xpos + playerSpeed;
        if ((newXpos + $("#player").width()) < $("#gameBoard").width() && newXpos >=0) {
            $("#player").css({left: newXpos});
        } else {
            $("#player").css({left: $("#gameBoard").width()-$("#player").width()});
        }
    }
} 

$(document).keyup(function(event) {
    var e = event || evt;
    var charCode = event.which || event.keyCode;
    var c = String.fromCharCode(charCode);
    if (charCode == "37" || charCode == "39" || charCode == "38" ) {
        playerDir = "stop";
    }
});

$(document).keydown(function(event) {
    var e = event || evt;
    var charCode = event.which || event.keyCode;
    var c = String.fromCharCode(charCode);

    if(charCode == "80") {
        if ( pause == "true") {
            pause = "false";
            window.setTimeout(game_tick, gameTickTime);
            window.setTimeout(gameTimer, 1000);
            $("#paused").hide();
        } else {
            pause = "true";
            $("#paused").show().html("Paused");
        }
    }

    if (charCode == "81"){
        endGame = "true";
    }

    if (charCode == "37") {
        if (playerDir == "right") {
            playerDir = "stop";
        } else {
            playerDir = "left";
        }
    }
    if (charCode == "39") {
        if (playerDir == "left") {
            playerDir = "stop";
        } else {
            playerDir = "right";
        }
    }
    if (charCode == "38") {
        $("#player").animate({top: '-=50%'});
		$("#player").animate({top: '+=50%'});
        
        
    }
});

});
