class Game{
    constructor(){
        this.results = [];
        this.everyWord = [];
        this.words = [];
        this.cells = document.querySelectorAll(".cell");
        this.char;
        this.num = 0;
        this.word;
        this.maxLimit = 5;
        this.minLimit = -1;
        this.norm = 0;
        this.running = false;
        this.winLimit = 0;
        this.guessesMade = 0;
        this.totalGuesses = 6;
        
        this.loadFromFile();
        this.initializeGame();     
    }

    loadFromFile(){
        $.get("lemmad2013.txt", (data) => this.getWords(data));
    }

    getWords(data){
        const dataFromFile = data.split('\n');
        this.seprateWordsByLength(dataFromFile);
    }

    seprateWordsByLength(data){
        for(let i = 0; i < data.length; i++){
            const wordLength = data[i].length;

            if(this.everyWord[wordLength] === undefined){
                this.everyWord[wordLength] = [];
            }

            this.everyWord[wordLength].push(data[i]);
        }

        this.words = this.everyWord[5];

        $('#btn').click(()=>{
            $('#info').hide();
            this.generateWord();
        }); 
    }

    generateWord(){
        let r = ["-","š","ž","ü","õ","ö","ä"];

        let result = this.words.filter(word => r.every(letter => !word.includes(letter)));
        const randomWord = Math.floor(Math.random() * result.length);
        this.word = result[randomWord].toUpperCase();
    }

    initializeGame(){
        this.running = true;
        $(document).on('keydown', (event)=>this.keyPressed(event.keyCode));
    }

    keyPressed(keypressed){
        if(this.running){
            while(this.num === this.maxLimit){
                if(keypressed === 8){
                    this.deletePressed();
                }
                if(keypressed === 13){
                    this.enterPressed();
                }
                return;
            }
            this.char = String.fromCharCode(keypressed);
            if(keypressed<91 && keypressed>64){
                this.cells[this.num].textContent = this.char.toUpperCase();
                this.num++;
            } else if(keypressed === 8){
                this.deletePressed();
            } else if(keypressed === 13 && this.num === this.maxLimit){
                this.enterPressed();
            }
        }      
    }

    lastLetter(keypressed){
        if(this.num === this.norm){
            this.num = this.norm+1;
        }
        this.char = String.fromCharCode(keypressed);
        if(keypressed<91 && keypressed>64){
            this.cells[this.num-1].textContent = this.char.toUpperCase();
            this.num--;
            console.log('LAST LETTER');
            this.keyPressed();
        } else if(keypressed === 13){
            this.enterPressed();
        }
        console.log(this.num);
        if(this.num === this.minLimit){
            this.num = this.norm;
        }
    }

    deletePressed(){
        if(this.num === this.norm){
            this.num = this.norm+1;
        }
        this.cells[this.num-1].textContent = "";
        this.num--;
        if(this.num === this.minLimit){
            this.num = this.norm;
        }
        $('#word').html("");
        this.keyPressed();
    }

    enterPressed(){
        let cellA = this.cells[this.winLimit].textContent;
        let cellB = this.cells[this.winLimit+1].textContent;
        let cellC = this.cells[this.winLimit+2].textContent;
        let cellD = this.cells[this.winLimit+3].textContent;
        let cellE = this.cells[this.winLimit+4].textContent;
            
        let guess = cellA+cellB+cellC+cellD+cellE;

        if(!this.words.includes(guess.toLowerCase())){
            $('#word').html("See pole sõna! Proovi midagi muud.");
            this.keyPressed();
        } else {
            this.maxLimit += 5;
            this.minLimit += 5;
            this.norm += 5;
            this.guessesMade += 1;
            this.updateGameInfo();
            this.checkWinner();
        }
    }

    updateGameInfo(){
        $('#guesses').html("Pakkumisi tehtud: " + this.guessesMade + "/" + this.totalGuesses);
    }

    checkWinner(){
        let roundWon = false;
        let j = 0;
        for(let i=this.winLimit; i<(this.winLimit+5); i++){
            let cell = this.cells[i].textContent;
            let cellA = this.cells[this.winLimit].textContent;
            let cellB = this.cells[this.winLimit+1].textContent;
            let cellC = this.cells[this.winLimit+2].textContent;
            let cellD = this.cells[this.winLimit+3].textContent;
            let cellE = this.cells[this.winLimit+4].textContent;
            
            if(cell != this.word[j]){
                $('#'+i).css({'background-color':'grey'});
            }
            if(cell == this.word[j]){
                $('#'+i).css({'background-color':'green'});
            } else if(cell != this.word[j]){
                if(this.word.includes(cell)){
                    $('#'+i).css({'background-color':'yellow'});               
                }
            } j++;

            if(cellA == this.word[0] && cellB == this.word[1] && cellC == this.word[2] && cellD == this.word[3] && cellE == this.word[4]){
                roundWon = true;
            }
        }

        if(roundWon){
            $('#word').html("Võitsid!");
            this.running = false;
            $('#guesses').html("Tegid kokku " + this.guessesMade + " pakkumist!");
            $(document).on('keypress', (event) =>{
                this.startNewGame(event.keyCode);
            })
        }
        if(this.maxLimit==35 && !roundWon){
            $('#word').html("Kaotasid! Õige sõna oli "+this.word);
            this.running = false;
            $(document).on('keypress', (event) =>{
                this.startNewGame(event.keyCode);
            })
        } else {
            this.winLimit += 5;
        }
    }

    startNewGame(key){
        $('#restart').html('Uuesti mängimiseks vajuta "R" tähte!');
        if(key===114){
            location.reload();
        }
    }
}
let game = new Game();