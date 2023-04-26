export default class ajaxHandler{
    constructor(){
        this.playerBlack;
        this.playerWhite;
        this.startTime;
        this.endTime;
        this.winner;
        this.results = [];
        this.blacksCaptured;
        this.whitesCaptured;

        this.loadFromFile();
        this.showResults();
    }

    loadFromFile(){
        $.get("php/db.txt", (data) => {
            var content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        });
    }
    startTimer(){
        this.startTime = 0;
    }
    endTimer(e){
        this.endTime = parseFloat(e/5);
        console.log("Start: "+this.startTime + " |  End: "+this.endTime);
    }
    saveResults(){
        var result = {
            playerB : this.playerBlack,
            playerW : this.playerWhite,
            gameLen : this.endTime,
            blackC : this.blacksCaptured,
            whiteC : this.whitesCaptured,
            win : this.winner
        }
        this.results.push(result);
        localStorage.setItem("score", JSON.stringify(this.results));
        console.log(this.results);

        $.post("php/server.php", {save: this.results}).done(function(){
            console.log("suck sess");
        }).fail(function(){
            console.log("no suck sess");
        }).always(function(){
            console.log("AJAX-i tegevused");
        })
    this.showResults();
    }
    showResults(){
        $("#scoreHolder").html("");
        for(var i =0; i<this.results.length; i++){
            if(i===3){break;}
            $("#scoreHolder").append(
                "<p>" + this.results[i].playerB +" vs. "+this.results[i].playerW+" | Winner: "+this.results[i].win +
                " | Time: "+this.results[i].gameLen + " seconds"
            );
        }
    }

}