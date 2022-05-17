 class MathGame{
    constructor(){
        this.name;
        this.startTime = 0;
        this.endTime = 0;
        this.results = [];
        this.right = 0;

        this.timesAnswered = 0;
        this.number1 = 0;
        this.number2 = 0;

        this.easy = 0;
        this.hard = 0;
        this.difficultyLevel = "";
        
        this.answerBox = document.getElementById('answerId');
        this.answerBox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer(e);
            }
        });
        this.exercise = document.getElementById('exercise');

        $('#results').hide();
        this.loadFromFile();
    }

    

    loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
        
        this.checkIfNameWriten();
        
    }

    checkIfNameWriten(){
        this.easy = 0;
        this.hard = 0;
    $('#submitName').click(()=>{
        this.name= $('#nameValue').val(); 

        if($('#difficultyLevelEasy').is(':checked')) {
            this.easy = 1; 
            }
        if($('#difficultyLevelHard').is(':checked')) {
            this.hard = 1;  
            }
    
            this.startGame(); 
            $('#name').hide();

            console.log(this.name);
            console.log(this.easy);
            console.log(this.hard);

           
        })
    }




    startGame(){
        this.generateNewOperation();
        this.startTime = performance.now();
    }


   generateNewOperation() {
        exercises = document.getElementById("exercises");
            
            if(this.easy == 1){
                this.number1 = Math.floor(Math.random() * 20) + 1;
                this.number2 = Math.floor(Math.random() * 20) + 1;
                this.answerBox.solution = this.number1 + this.number2;
                this.exercise.innerHTML = this.number1 + " + " + this.number2 + " = ";
                this.difficultyLevel = "Lihtne";
            }

            if(this.hard == 1){
                this.number1 = Math.floor(Math.random() * 20) + 1;
                this.number2 = Math.floor(Math.random() * 20) + 1;
                this.answerBox.solution = this.number1 * this.number2;
                this.exercise.innerHTML = this.number1 + " x " + this.number2 + " = ";
                this.difficultyLevel = "Raske";
            }

           
            exercises.append(this.answerBox);

            console.log(this.startTime);
    }



    checkAnswer(){

        if(this.answerBox.value == this.answerBox.solution){
            this.right++;
        }
        console.log(this.right);
        console.log(this.answerBox.value);
        console.log(this.answerBox.solution);
    

        this.answerBox.value = "";
        this.exercise.innerHTML = "";

    this.timesAnswered++;
    console.log(this.timesAnswered);

    if(this.timesAnswered >= 4){
        this.saveEndTime();
       
    }else{
        this.generateNewOperation();
    }   
    }

        


    saveEndTime(){
        this.endTime = performance.now();
        $('#results').show();
        $('#exercises').hide();
        $('#startNew').show();
        this.saveResults();

        document.getElementById("startNewBtn").addEventListener("click", this.startNewGame);
    } 


        startNewGame(){
            $('#name').show();
            $('#startNew').hide();
            $('#results').hide();
            $('#exercises').show();
            //this.generateNewOperation();
            this.startTime = performance.now();
            //-----//this.checkIfNameWriten();
            this.loadFromFile();
        }
    

        saveResults(){
        let result = {
            name: this.name,
            time: ((this.endTime-this.startTime)/1000).toFixed(2),
            rightanswers: this.right,
            difficulty: this.difficultyLevel,
        }
        this.timesAnswered = 0;
        this.easy = 0;
        this.hard = 0;
        this.right = 0;

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
                $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + this.results[i].name + '</div><div> ' + this.results[i].time + '</div><div> ' + 'õigeid vastuseid: ' + this.results[i].rightanswers + '</div><div>' + 'raskusaste: ' + this.results[i].difficulty + '</div></div>');
                $("." + i).click(()=>{this.deleteResult(i)});
            }
        }
   
}
let mathgame = new MathGame();