class MemoryGame{
    constructor(){
        this.yellow = $('#yellow');
        this.green = $('#green');
        this.red = $('#red');
        this.blue = $('#blue');
        this.sequence = [this.getRandomBox()];
        this.testSequence = [...this.sequence];
        this.score = 0;
        this.canClick = false;
        this.results = [];
        this.name;
        this.loadFromFile();
        this.startGame();
    }
    
    loadFromFile(){
        $.get('database.txt', (data) => {
            let content = JSON.parse(data).content;
            this.results = content;
            console.log(content)
            localStorage.setItem('score', JSON.stringify(content));
        });
    }
    
    startGame(){
        $('#start').on('click', () => {
            this.name = $('#nameValue').val();
            $('#intro').addClass('hidden');
            $('#game').removeClass('hidden');
            $('#score').removeClass('hidden');
            $('#play').removeClass('hidden');
            this.showScore();
            this.play();
        })
    }

    play(){
        $('#play').on('click', () => {
            this.showSequence();
            $('#play').prop('disabled', true);
        });
        $('.box').on('click', (clickedBox) => {
            if(!this.canClick){return}
            const expectedBox = this.testSequence.shift();
            if(expectedBox[0].id === clickedBox.target.id){
                console.log(this.score)
                if(this.testSequence.length === 0){
                    this.score++;
                    this.showScore();
                    this.canClick = false;
                    this.sequence.push(this.getRandomBox());
                    this.testSequence = [...this.sequence];
                    this.showSequence();
                }
            } else {
                this.saveResults();
                alert(`Mäng läbi!\nNimi: ${this.name}\nSkoor: ${this.score}`);
                this.score = 0;
                $('#intro').removeClass('hidden');
                $('#game').addClass('hidden');
                $('#score').addClass('hidden');
                $('#play').addClass('hidden');
                $('#play').prop('disabled', false);
                this.sequence = [this.getRandomBox()];
                this.testSequence = [...this.sequence];
            }

        });
    }

    showBox(box){
        return new Promise((resolve, reject) => {
            box.addClass('show');
            setTimeout(() => {
                box.removeClass('show');
                setTimeout(() => {
                    resolve();
                }, 250);
            }, 750);
        });
    }

    async showSequence(){
        for(let box of this.sequence){
            this.canClick = false;
            await this.showBox(box);
        }
        this.canClick = true;
    }

    getRandomBox(){
        const boxes = [this.yellow, this.green, this.red, this.blue];
        return boxes[parseInt(Math.random() * 4)];
    }

    showScore(){
        $('#score').html(`Skoor: ${this.score}`);
    }

    saveResults(){
        let result = {
            name: this.name,
            score: this.score
        }
        
        this.results.push(result);
        this.results.sort((a, b) => parseInt(b.score) - parseInt(a.score));
        
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
        $('#results').html('');
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break;}
            $('#results').append(`${i + 1}. ${this.results[i].name} ${this.results[i].score} <br>`);
        }
    }

}

let game = new MemoryGame();