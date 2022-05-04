let playerName = prompt('Palun sisesta oma nimi');

class Battleship {
    constructor(name){
        this.name = name;
        this.shipCount = 5;
        this.shipsPlaced = 0;
        this.opponentShips = 5;
        this.enemyShips = [];
        this.ownShips = [];
        this.shotsFired = 0;
        this.attacks = [];
        this.hits = 0;
        this.misses = 0;
        this.turn = 0;
        this.gameStatus = "preparation";
        this.winner = "";
        this.results = [];

        this.loadFromFile();
    }

    loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 

        this.showResults();
        this.action();
    }

    action(){
        if(this.gameStatus=="preparation"){
            $('#Player').click((e)=>this.placeShips(e));
        } 
        if(this.gameStatus=="battle"){
            $('#CPU').click((e)=>this.attack(e));
        }
    }
    
    placeShips(e){
        console.log(e.target.parentElement.rowIndex + " " + e.target.cellIndex);
        let targetCell = e.target.parentElement.rowIndex + "" + e.target.cellIndex + "P";
        if($("#"+targetCell).hasClass("ship")==false){
            if(this.shipsPlaced < 5){
                this.shipsPlaced++;
                $("#"+targetCell).toggleClass('ship');
                this.ownShips.push(e.target.parentElement.rowIndex + "" + e.target.cellIndex + "P");
                $('#yourShips').html("Sinu laevu: "+this.shipsPlaced);
            } 
            if(this.shipsPlaced==5) {
                $('#Player').off("click");
                this.gameStatus = "battle";
                $('#status').html("Laevad paigutatud. Alusta vastase pommitamist");
                this.generateEnemyShips();
                $('#enemyShips').html("Vastase laevu: "+this.opponentShips);
                this.action();
            }
        }
    }

    generateEnemyShips(){
        for(let i=0; i<this.shipCount+1; i++){
            this.x = Math.floor((Math.random() * 5) + 1);
            this.y = Math.floor((Math.random() * 5) + 1);
            
            if(this.enemyShips.indexOf(this.x+""+this.y+"C") === -1){
                this.enemyShips.push(this.x + "" + this.y + "C");
            } else {
                i -= 1;
            }
        }
        console.log(this.enemyShips);
        console.log(this.ownShips);
    }

    attack(e){
        let targetCell = e.target.parentElement.rowIndex + "" + e.target.cellIndex + "C";
        if(!$("#"+targetCell).is('[class*="miss"]') && !$("#"+targetCell).is('[class*="hit"]')){
            if(this.enemyShips.indexOf(targetCell) === -1){
                $("#"+targetCell).addClass('miss');
            } else {
                $("#"+targetCell).addClass('hit');
                this.opponentShips--;
                if(this.opponentShips===0){
                    this.gameStatus = "playerWins";
                    this.winner = "Mangija";
                    $('#CPU').off("click");
                    this.displayConclusion();
                    this.saveResults();
                }
            }
            this.enemyAttack();
        }
        $('#enemyShips').html("Vastase laevu: "+this.opponentShips);
    }

    enemyAttack(){
        this.x = Math.floor((Math.random() * 5) + 1);
        this.y = Math.floor((Math.random() * 5) + 1);
        let targetCell = this.x + "" + this.y + "P";

        if(this.attacks.indexOf(targetCell) === -1){
            this.attacks.push(targetCell);
            if(this.ownShips.indexOf(targetCell) === -1){
                $("#"+targetCell).addClass('miss');
            } else {
                $("#"+targetCell).addClass('hit');
                this.shipsPlaced--;
                $('#yourShips').html("Sinu laevu: "+this.shipsPlaced);
                if(this.shipsPlaced===0){
                    this.gameStatus = "opponentWins";
                    this.winner = "Arvuti";
                    $('#CPU').off("click");
                    this.displayConclusion();
                    this.saveResults();
                }
            }
            this.turn++;
        } else {
            this.enemyAttack();
        }
        $('#turn').html("Käik: "+this.turn);
    }

    displayConclusion(){
        if(this.gameStatus=="playerWins"){
            $('#status').html("Mäng läbi. Sina võitsid!");
        } else if(this.gameStatus=="opponentWins"){
            $('#status').html("Mäng läbi. Vastane võitis!");
        }
    }

    saveResults(){
        let result = {
            name: this.name,
            turns: this.turn,
            winner: this.winner
        }
        
        this.results.push(result);

        this.sortResults();

        this.results.splice(10, 10);

        localStorage.setItem('score', JSON.stringify(this.results));

        $.post('server.php', {save: this.results}).done(function(){
            console.log('Success');
        }).fail(function(){
            alert('FAIL');
        }).always(
            function(){
                console.log('Tegime midagi AJAXiga');
            }
        )

        this.showResults();
    }

    sortResults(){
        this.results.sort((a, b) => parseFloat(a.turns) - parseFloat(b.turns));
    }

    showResults(){
        $('#results').html("");
        this.sortResults();
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break;}
            $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + this.results[i].name + '</div><div> Käike: ' + this.results[i].turns + '</div><div> Võitis: ' + this.results[i].winner + '</div></div>');
        }

        this.action();
    }
}

let battleship = new Battleship(playerName);