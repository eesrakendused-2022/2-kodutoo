class scoreBoard{
    constructor(){
        this.results = []
        this.score = 10;
        this.loadFromFile();
        
    }

    loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }

    saveResults(){
        let result = {
            score: this.score}

        this.results.push(result);

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


    showResults(){
        $('#results').html("");
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break;}
            $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. '
             + this.results[i].score);
        }
    }
}
 let scoreboard = new scoreBoard();