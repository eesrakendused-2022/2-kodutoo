let playerName = prompt('Palun sisesta oma nimi');

class MoreLess{
    constructor(name){
        this.name = name;
        this.numbersInGame = 1;
        this.number;
        this.guess;
        this.startTime = 0;
        this.endTime = 0;
        this.results = [];

        this.loadFromFile();
        
        
    }
    
    loadFromFile(){
        $.get("database2.txt", (data) => {
            console.log(data);
            let content = JSON.parse(data).content;
            if(content!=null){
                this.results = content;
            }
            localStorage.setItem('score', JSON.stringify(content));
        }).always(function(){
            console.log('Done');
        });
        
        this.showResults();
        this.generateNumbers();
    }

    showResults(){
        $('#results').html("");
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break;}
            $('#results').append( (i+1) + '.' + this.results[i].name + ' ' + this.results[i].time + '<br>');

        }
    }

    generateNumbers(){
        for(let i=0;i<this.numbersInGame;i++){
            this.number=Math.round(Math.random()*100)
        }
        this.startGuessing()
    }
    startGuessing(){
        this.startTime = performance.now();
        $('#save').click(()=>{
            this.guess=parseInt($('#guess').val());
            console.log(this.guess);
           this.guesser();
        });
    }
    guesser(){
        if(this.guess<this.number){
            console.log(this.guess<this.number);
            $('#hint').html("Sisestatud arv on väiksem");
        }else if(this.guess>this.number){
            console.log(this.guess>this.number);
            $('#hint').html("Sisestatud arv on suurem");
        }else if(this.guess==this.number){
            console.log(this.guess==this.number);
            this.endTime=performance.now();
            $('#hint').html("Arvasid ära"+" "+(this.endTime-this.startTime)/1000);
            this.saveResults()
        } 
    }
    saveResults(){
        let result = {
            name: this.name,
            time: ((this.endTime-this.startTime)/1000).toFixed(2)
        }
        console.log(result);
        console.log(this.results);

        this.results.push(result);

        this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        localStorage.setItem('score', JSON.stringify(this.results));

        $.post('server2.php', {save: this.results}).done(function(){
            console.log('Success');
        }).fail(function(){
            alert('FAIL');
        })

        this.showResults();
    }
}

let moreless=new MoreLess(playerName);