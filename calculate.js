 class MathGame{
    constructor(){
        this.name;
        this.startTime = 0;
        this.endTime = 0;
        this.operationsCompleted = 0;
        this.results = [];
        this.right = 0;

        this.timesAnswered = 0;

        //this.loadFromFile();
       

        this.startGame();
    }

    /*loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }*/

    /* checkIfNameWriten(){
    $('#submitName').click(()=>{
        this.name= $('#nameValue').val(); 
            this.startGame(); 
            $('#name').hide();

            console.log(this.name);
        })
    } */

    

    startGame(){
        this.generateNewOperation();
        this.startTime = performance.now();
        //$(document).off('keypress');
        //$(document).on('keypress', (event)=>this.saveEndTime(event.key));
        //this.updateGameInfo();  
        //this.showResults();   T
    }


   generateNewOperation() {
        exercises = document.getElementById("exercises");
        exercises.innerHTML = "";
        

            //--------------------------
            // teeb 5 tehet
        //for(var i = 0; i < 1; i++){
            var exercise = document.createElement("div");
            var answerBox = document.createElement("input");
            answerBox.id = 'answerId';
            
            //var exercise_type = Math.floor(Math.random() * 4);
            var number1;
            var number2;
            
            //if(exercise_type == 0){
                number1 = Math.floor(Math.random() * 20) + 1;
                number2 = Math.floor(Math.random() * 20) + 1;
                answerBox.solution = number1 + number2;
                exercise.innerHTML = number1 + " + " + number2 + " = ";
            //}

            exercise.append(answerBox);
            
            exercises.append(exercise);
        //}


        answerBox = document.getElementById('answerId');
         if(answerBox.value == answerBox.solution){
                this.right++;
            }
            console.log(this.right);
            console.log(answerBox.value);
            console.log(answerBox.solution); 



            answerBox.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    //this.generateNewOperation(e);
                    //this.checkAnswer(e);


                    this.timesAnswered++;

                    if(this.timesAnswered <= 3){
                        this.generateNewOperation(e);
                    }
                }
            });

            //this.checkAnswer();

            console.log(this.startTime);
    }


    



    /*checkAnswer(){
        //answ = document.getElementById('exercises').value;
        //console.log(answ);

        for(var i = 0; i < 1; i++){
        answerBox = document.getElementById('answerId');
        if(answerBox.value == answerBox.solution){
            this.right++;
        }
        console.log(this.right);
        console.log(answerBox.value);
        console.log(answerBox.solution);
    }

        this.generateNewOperation();
    }
*/
        





    //VASTUSTE KONTROLL


    /*check_exercises = function(){
        var generate = document.getElementById("generate");
        //generate.innerHTML = "Generate Exercises";
        //generate.onclick= generate_exercises;
        
        var right = 0;
        
        for(var i = 0; i < 5; i++)
        {
            answerBox = document.getElementById(i);
            if(answerBox.value == answerBox.solution)
            {
                right++;
                //experience++;
            }
        }
        
        exercises = document.getElementById("exercises");
        exercises.innerHTML = "You have solved " + right + " of 10 exercises successfully!";
        //increase_level();
        show_stats();

    } */
    
    

    //----------------------------------------


   

    saveEndTime(keypressed){
    console.log(keypressed);
    this.endTime = performance.now();
    $('#results').html(this.name + " sinu aeg oli " + ((this.endTime-this.startTime)/1000).toFixed(2));
    $('#exercises').hide();
    $('#startNew').show();
    this.saveResults();
    $(document).off('keypress');
    $(document).on('keypress', (event) =>{
        this.startNewGame(event.keyCode);
    })
    } 


    startNewGame(key){
    console.log(key)

    if(key===114){
        
        this.startGame();
        $('#exercises').show();
        $('#startNew').hide();
    }
    }

    saveResults(){
    let result = {
        name: this.name,
        time: ((this.endTime-this.startTime)/1000).toFixed(2),
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
}
let mathgame = new MathGame();