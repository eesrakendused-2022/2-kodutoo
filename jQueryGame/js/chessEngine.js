class chessEngine2{
    constructor(side, pStep){
        this.side = side;
        this.name;
        this.chessAreaChars = ["a", "b", "c", "d", "e", "f", "g", "h"]
        this.chessboard = $("#playArea");
        this.pawnsBlack = $(".pawnB");
        this.pawnsWhite = $(".pawnW");
        this.rooksWhite = $(".rookW");
        this.bishopsWhite = $(".bishopW");
        this.queenWhite = $(".queenW");
        this.knightsWhite = $(".knightW");
        this.kingWhite = $(".kingW");
        this.blacksOrWhites = [".blacks", ".whites"];
        this.testItems =
        [$(".pawnB"), 
        $(".rookB"), 
        $(".bishopB"), 
        $(".queenB"), 
        $(".knightB"), 
        $(".kingB")];
        //this.readClicksBlack();
        this.pawnStep = pStep;
        this.clicked=0;
        this.highlighted = [];
        this.readClicksWhite();
        this.readAllClicks();
        this.readClicksWhiteRook();
        this.readClicksWhiteBishop();
        this.readClicksWhiteQueen();
        this.readClicksWhiteKnight();
        this.readClicksWhiteKing();
        this.highlightedPiece;
        this.playerPause = false;
        //this.playerPauseBlack = true;
        this.timer = ms => new Promise(res => setTimeout(res, ms));
        this.clock = $("#timer");
        this.didMove;
        this.eatCounter = 0;
        //this.printTestVals();
    }
    /*printTestVals(){
        for(var i=0; i<2; i++){
            for(var a=0; a<this.testItems[0].length; a++){
                console.log(this.testItems[i][a]);
            }
        }
    }*/

    /*async startTimer(){
        for(var i=0; i<31; i++){
            if(this.playerPauseWhite == true){
                this.clock.html("00:"+parseInt(30-i));
                console.log(this.clock);
                console.log(this.playerPauseWhite);
                await this.timer(1000);
            } else{
                this.clock.html("00:00");
                break;
            }
        }
        this.playerPauseWhite = false;
    }*/
    

    // DELETE ALL OBJECT HIGHLIGHTS
    convertPawns(){
        $(this.pawnsWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
        $(this.rooksWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
        $(this.bishopsWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
        $(this.queenWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
        $(this.knightsWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
        $(this.kingWhite).css({
            "width" : "",
            "height" : "",
            "box-shadow": ""
        })
    }
    

    // HIGHLIGHT STEPS

    highlightSteps(p){
        $("#"+p).css({
                "background-color" : "red"
            })
        }


    // DELETE ALL HIGHLIGHTS

    convertHighlight(){
        for(var i=0; i<this.highlighted.length; i++){
            $("#"+this.highlighted[i]).css({
                "background-color" : ""
            })
        }
        this.highlighted = []
    }

        // OBJECT MOVEMENT/EAT INITALIZER

        movePawn(obj, loc){
            if(this.playerPause == true){
                console.log("nonono no movement for you");
            } else{
                console.log(obj);
                $("#"+obj).css({
                    "animation" : "whooshThePiece 1s"
                });
                if($("#"+loc).children().length>0){
                    $("#"+loc).empty();
                    $("#"+loc).append($("#"+obj));
                    this.eatCounter++;
                } else {
                    $("#"+loc).append($("#"+obj))
                }
                //this.playerPause = true;
                //this.startTimer();
            }
            }
          
            
            // --- MOVEMENT AREA---

            // START OF PAWN MOVEMENT
            
        pawnPossibleMovement(e){
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            var step = locationLetter + (parseInt(locationNum) + this.pawnStep).toString();
                var leftStep = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)-1] + (parseInt(locationNum) + this.pawnStep).toString();
                var rightStep = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)+1] + (parseInt(locationNum) + this.pawnStep).toString();
                console.log(leftStep, rightStep);
            if($("#"+step).children().length>0){
                if($("#"+leftStep).children(this.blacksOrWhites[this.side]).length>0 && $("#"+rightStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(leftStep, rightStep);
                    console.log(this.blacksOrWhites[this.side]);
                    this.highlightSteps(leftStep);
                    this.highlightSteps(rightStep);
                } else if($("#"+leftStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(leftStep);
                    this.highlightSteps(leftStep);
                } else if($("#"+rightStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(rightStep);
                    this.highlightSteps(rightStep);
                } 
            } else{
                this.highlighted.push(step);
                this.highlightSteps(step);
                console.log(this.blacksOrWhites[this.side]);
                if($("#"+leftStep).children(this.blacksOrWhites[this.side]).length>0 && $("#"+rightStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(leftStep, rightStep);
                    this.highlightSteps(leftStep);
                    this.highlightSteps(rightStep);
                } else if($("#"+leftStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(leftStep);
                    this.highlightSteps(leftStep);
                } else if($("#"+rightStep).children(this.blacksOrWhites[this.side]).length>0){
                    this.highlighted.push(rightStep);
                    this.highlightSteps(rightStep);
                }  else{
                    this.highlighted.push(step);
                    this.highlightSteps(step);
                }
            }
            
        }
        
        // END OF PAWN MOVEMENT
        
        
        
        // START OF BISHOP MOVEMENT
        
        bishopPossibleMovements(e){
            console.log("LOOK AT ME I CAN GO EVERYWHERE!");
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationIndex = this.chessAreaChars.indexOf(locationLetter);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            console.log(locationLetter, locationNum);
            for(var i=1; i<8;i++){
                var possibleMovement = this.chessAreaChars[locationIndex+i] + (parseInt(locationNum)+i);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var a=1; a<8;a++){
                var possibleMovement = this.chessAreaChars[locationIndex-a] + (parseInt(locationNum)-a);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var x=1; x<8;x++){
                var possibleMovement = this.chessAreaChars[locationIndex-x] + (parseInt(locationNum)+x);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var y=1; y<8;y++){
                var possibleMovement = this.chessAreaChars[locationIndex+y] + (parseInt(locationNum)-y);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
        }
        
        // END OF BISHOP MOVEMENT
        
        
        
        // START OF QUEEN MOVEMENT
        
        queenPossibleMovements(e){
            console.log("WOO MA SAAN IGALE POOLE MINNA");
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            var locationIndex = this.chessAreaChars.indexOf(locationLetter);
            console.log(locationLetter, locationNum);
            for(var i=1; i<8;i++){
                var possibleMovement = locationLetter + (parseInt(locationNum)+i);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var x=1; x<8;x++){
                var possibleMovement = locationLetter + (parseInt(locationNum)-x);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var y=1; y<this.chessAreaChars.length*2; y++){
                var possibleMovement = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)-y] + (parseInt(locationNum));
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            
            
            for(var a=1; a<this.chessAreaChars.length*2; a++){
                var possibleMovement = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)+a] + (parseInt(locationNum));
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var i=1; i<8;i++){
                var possibleMovement = this.chessAreaChars[locationIndex+i] + (parseInt(locationNum)+i);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var a=1; a<8;a++){
                var possibleMovement = this.chessAreaChars[locationIndex-a] + (parseInt(locationNum)-a);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var x=1; x<8;x++){
                var possibleMovement = this.chessAreaChars[locationIndex-x] + (parseInt(locationNum)+x);
                console.log(possibleMovement);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var y=1; y<8;y++){
                var possibleMovement = this.chessAreaChars[locationIndex+y] + (parseInt(locationNum)-y);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".blacks").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            
        }
        
        // END OF QUEEN MOVEMENT
        
        
        
        // START OF ROOK MOVEMENT
        
        rookPossibleMovements(e){
            console.log("WOO MA SAAN IGALE POOLE MINNA");
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            console.log(locationLetter, locationNum);
            for(var i=1; i<8;i++){
                var possibleMovement = locationLetter + (parseInt(locationNum)+i);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var x=1; x<8;x++){
                var possibleMovement = locationLetter + (parseInt(locationNum)-x);
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
            for(var y=1; y<this.chessAreaChars.length*2; y++){
                var possibleMovement = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)-y] + (parseInt(locationNum));
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }

            
            for(var a=1; a<this.chessAreaChars.length*2; a++){
                var possibleMovement = this.chessAreaChars[this.chessAreaChars.indexOf(locationLetter)+a] + (parseInt(locationNum));
                if($("#"+possibleMovement).children().length>0){
                    if($("#"+possibleMovement).children(".pawnB").length>0){
                        this.highlighted.push(possibleMovement);
                        this.highlightSteps(possibleMovement);
                    }
                    break;
                } else{
                    this.highlighted.push(possibleMovement);
                    this.highlightSteps(possibleMovement);
                }
            }
        }

        // END OF ROOK MOVEMENT



        // START OF KNIGHT MOVEMENT


        knightPossibleMovements(e){
            console.log("HIPPITY HOPPITY THE KNIGHT WILL STEAL YOUR PROPERTY");
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            var locationIndex = this.chessAreaChars.indexOf(locationLetter);
            var upLeft = this.chessAreaChars[locationIndex-1]+(parseInt(locationNum)+2);
            var upRight = this.chessAreaChars[locationIndex+1]+(parseInt(locationNum)+2);
            var leftUp = this.chessAreaChars[locationIndex-2]+(parseInt(locationNum)+1);
            var leftDown = this.chessAreaChars[locationIndex-2]+(parseInt(locationNum)-1);
            var downLeft = this.chessAreaChars[locationIndex-1]+(parseInt(locationNum)-2);
            var downRight = this.chessAreaChars[locationIndex+1]+(parseInt(locationNum)-2);
            var rightUp = this.chessAreaChars[locationIndex+2]+(parseInt(locationNum)+1);
            var rightDown = this.chessAreaChars[locationIndex+2]+(parseInt(locationNum)-1);
            console.log(upLeft);
            if($("#"+upLeft).children().length>0){
                if($("#"+upLeft).children(".blacks").length>0){
                    this.highlighted.push(upLeft);
                    this.highlightSteps(upLeft);
                }
            } else{
                this.highlighted.push(upLeft);
                this.highlightSteps(upLeft);
            }

            if($("#"+upRight).children().length>0){
                if($("#"+upRight).children(".blacks").length>0){
                    this.highlighted.push(upRight);
                    this.highlightSteps(upRight);
                }
            } else{
                this.highlighted.push(upRight);
                this.highlightSteps(upRight);
            }

            if($("#"+leftUp).children().length>0){
                if($("#"+leftUp).children(".blacks").length>0){
                    this.highlighted.push(leftUp);
                    this.highlightSteps(leftUp);
                }
            } else{
                this.highlighted.push(leftUp);
                this.highlightSteps(leftUp);
            }

            if($("#"+leftDown).children().length>0){
                if($("#"+leftDown).children(".blacks").length>0){
                    this.highlighted.push(leftDown);
                    this.highlightSteps(leftDown);
                }
            } else{
                this.highlighted.push(leftDown);
                this.highlightSteps(leftDown);
            }
            
            if($("#"+downLeft).children().length>0){
                if($("#"+downLeft).children(".blacks").length>0){
                    this.highlighted.push(downLeft);
                    this.highlightSteps(downLeft);
                }
            } else{
                this.highlighted.push(downLeft);
                this.highlightSteps(downLeft);
            }

            if($("#"+downRight).children().length>0){
                if($("#"+downRight).children(".blacks").length>0){
                    this.highlighted.push(downRight);
                    this.highlightSteps(downRight);
                }
            } else{
                this.highlighted.push(downRight);
                this.highlightSteps(downRight);
            }

            if($("#"+rightUp).children().length>0){
                if($("#"+rightUp).children(".blacks").length>0){
                    this.highlighted.push(rightUp);
                    this.highlightSteps(rightUp);
                }
            } else{
                this.highlighted.push(rightUp);
                this.highlightSteps(rightUp);
            }

            if($("#"+rightDown).children().length>0){
                if($("#"+rightDown).children(".blacks").length>0){
                    this.highlighted.push(rightDown);
                    this.highlightSteps(rightDown);
                }
            } else{
                this.highlighted.push(rightDown);
                this.highlightSteps(rightDown);
            }


        }

        // END OF KNIGHT MOVEMENT



        // START OF KING MOVEMENT

        kingPossibleMovement(e){
            console.log("BIG BOSS KING MAKING A MOVE");
            var locationLetter = $(e.currentTarget).parent().attr("id").slice(0, 1);
            var locationNum = $(e.currentTarget).parent().attr("id").slice(1);
            var locationIndex = this.chessAreaChars.indexOf(locationLetter);
            var possibleUpMovements = this.chessAreaChars[locationIndex]+(parseInt(locationNum)+1);
            var possibleUpMovementsR = this.chessAreaChars[locationIndex+1]+(parseInt(locationNum)+1);
            var possibleUpMovementsL = this.chessAreaChars[locationIndex-1]+(parseInt(locationNum)+1);
            console.log(possibleUpMovements, possibleUpMovementsL, possibleUpMovementsR);
            var movementsR = this.chessAreaChars[locationIndex+1]+(parseInt(locationNum));
            var movementsL = this.chessAreaChars[locationIndex-1]+(parseInt(locationNum));
            var possibleDownMovements = this.chessAreaChars[locationIndex]+(parseInt(locationNum)-1);
            var possibleDownMovementsR = this.chessAreaChars[locationIndex+1]+(parseInt(locationNum)-1);
            var possibleDownMovementsL = this.chessAreaChars[locationIndex-1]+(parseInt(locationNum)-1);
            if($("#"+possibleUpMovements).children().length>0){
                if($("#"+possibleUpMovements).children(".blacks").length>0){
                    this.highlighted.push(possibleUpMovements);
                    this.highlightSteps(possibleUpMovements);
                }
            } else{
                this.highlighted.push(possibleUpMovements);
                this.highlightSteps(possibleUpMovements);
            }

            if($("#"+possibleUpMovementsR).children().length>0){
                if($("#"+possibleUpMovementsR).children(".blacks").length>0){
                    this.highlighted.push(possibleUpMovementsR);
                    this.highlightSteps(possibleUpMovementsR);
                }
            } else{
                this.highlighted.push(possibleUpMovementsR);
                this.highlightSteps(possibleUpMovementsR);
            }

            if($("#"+possibleUpMovementsL).children().length>0){
                if($("#"+possibleUpMovementsL).children(".blacks").length>0){
                    this.highlighted.push(possibleUpMovementsL);
                    this.highlightSteps(possibleUpMovementsL);
                }
            } else{
                this.highlighted.push(possibleUpMovementsL);
                this.highlightSteps(possibleUpMovementsL);
            }

            if($("#"+movementsL).children().length>0){
                if($("#"+movementsL).children(".blacks").length>0){
                    this.highlighted.push(movementsL);
                    this.highlightSteps(movementsL);
                }
            } else{
                this.highlighted.push(movementsL);
                this.highlightSteps(movementsL);
            }

            if($("#"+movementsR).children().length>0){
                if($("#"+movementsR).children(".blacks").length>0){
                    this.highlighted.push(movementsR);
                    this.highlightSteps(movementsR);
                }
            } else{
                this.highlighted.push(movementsR);
                this.highlightSteps(movementsR);
            }

            if($("#"+possibleDownMovements).children().length>0){
                if($("#"+possibleDownMovements).children(".blacks").length>0){
                    this.highlighted.push(possibleDownMovements);
                    this.highlightSteps(possibleDownMovements);
                }
            } else{
                this.highlighted.push(possibleDownMovements);
                this.highlightSteps(possibleDownMovements);
            }

            if($("#"+possibleDownMovementsL).children().length>0){
                if($("#"+possibleDownMovementsL).children(".blacks").length>0){
                    this.highlighted.push(possibleDownMovementsL);
                    this.highlightSteps(possibleDownMovementsL);
                }
            } else{
                this.highlighted.push(possibleDownMovementsL);
                this.highlightSteps(possibleDownMovementsL);
            }

            if($("#"+possibleDownMovementsR).children().length>0){
                if($("#"+possibleDownMovementsR).children(".blacks").length>0){
                    this.highlighted.push(possibleDownMovementsR);
                    this.highlightSteps(possibleDownMovementsR);
                }
            } else{
                this.highlighted.push(possibleDownMovementsR);
                this.highlightSteps(possibleDownMovementsR);
            }
            
        }

        // END OF KING MOVEMENT


        // --- CLICKS AREA---

        // READ CLICKS ON KING

        readClicksWhiteKing(){
            $(this.kingWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                        console.log("Clicked on "+a);
                        $(e.target).css({
                            "width" : "60px",
                            "height" : "60px",
                            "box-shadow": "3px 3px 3px black"
                        })
                        engine.kingPossibleMovement(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns()
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
            }

        // READ CLICKS ON PAWNS
    
        readClicksWhite(){
            $(this.pawnsWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                        console.log("Clicked on "+a);
                        $(e.target).css({
                            "width" : "60px",
                            "height" : "60px",
                            "box-shadow": "1px 1px 1px black"
                        })
                        engine.pawnPossibleMovement(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns()
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
            }
            
        // READ CLICKS ON ROOK
        
        readClicksWhiteRook(){
            $(this.rooksWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                    console.log("Clicked on "+a);
                    $(e.target).css({
                        "width" : "60px",
                        "height" : "60px",
                        "box-shadow": "3px 3px 3px black"
                    })
                        engine.rookPossibleMovements(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns();
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
        }

        // READ CLICKS ON BISHOP
        
        readClicksWhiteBishop(){
            $(this.bishopsWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                        console.log("Clicked on "+a);
                        $(e.target).css({
                            "width" : "60px",
                            "height" : "60px",
                            "box-shadow": "3px 3px 3px black"
                        })
                        engine.bishopPossibleMovements(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns();
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
        }

        // READ CLICKS ON QUEEN
        
        readClicksWhiteQueen(){
            $(this.queenWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                        console.log("Clicked on "+a);
                        $(e.target).css({
                            "width" : "60px",
                            "height" : "60px",
                            "box-shadow": "3px 3px 3px black"
                        })
                        engine.queenPossibleMovements(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns();
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
        }

        // READ CLICKS ON KNIGHTS
        
        readClicksWhiteKnight(){
            $(this.knightsWhite).click(function(e){
                if(engine.clicked ==0){
                    var a = $(e.currentTarget).attr("id")
                        console.log("Clicked on "+a);
                        $(e.target).css({
                            "width" : "60px",
                            "height" : "60px",
                            "box-shadow": "3px 3px 3px black"
                        })
                        engine.knightPossibleMovements(e);
                        engine.clicked = 1;
                        engine.highlightedPiece = a;
                    } else {
                        engine.convertPawns();
                        engine.convertHighlight();
                        engine.clicked = 0;
                    }
                })
        }

        /*readClicksBlack(){
            $(this.pawnsBlack).click(function(e){
                console.log("Clicked on "+$(e.currentTarget).attr("id"));
                engine.playerPauseWhite = false;
                this.playerPauseBlack = true;
                console.log(this.playerPauseWhite);
            })
        }*/


        // INIT AND CANCEL CLICKS

        readAllClicks(){
            $(document).click(function(e){
                var clickArea = $(e.target).attr("id");
                console.log(clickArea);
                if(engine.highlighted.includes(clickArea)){
                    engine.didMove = true;
                    console.log(clickArea+". Salvestame tekstifaili!");
                    console.log("sinna saab minna")
                    engine.movePawn(engine.highlightedPiece, clickArea);
                    engine.highlightedPiece = "";
                    engine.clicked = 0;
                    engine.convertHighlight();
                    engine.convertPawns();
                } else{
                    engine.didMove = false;
                }
            })
        }
}
let engine = new chessEngine2(0, 1);
export default engine;