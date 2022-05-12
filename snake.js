$(function(){
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var snake = [
        {x: 50, y: 100, oldX: 0, oldY: 0},
        {x: 50, y: 90, oldX: 0, oldY: 0},
        {x: 50, y: 80, oldX: 0, oldY: 0},
    ];

    var food = {x: 200, y: 200, eaten: false};
    var snakeWidth = snakeHeight = 10;
    var blockSize = 10;
    var score = 0;
    var speed = 100;
    var game;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    
    var keyPressed = DOWN;
    

    function gameLoop(){
        console.log('loop running')
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();

    }

    function moveSnake(){
        $.each(snake, function(index, value){
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
           if(index == 0){
               if(keyPressed == DOWN){
                   snake[index].y = value.y  +  blockSize;
               } else if(keyPressed == UP){
                snake[index].y = value.y  -  blockSize;
               }  else if(keyPressed == RIGHT){
                snake[index].x = value.x  +  blockSize;
               } else if(keyPressed == LEFT){
                snake[index].x = value.x  -  blockSize;
               }
           }else{
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
           }
        });

    }
    

    function drawSnake(){
        $.each(snake, function(index, value){
            ctx.fillStyle = 'black';
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(value.x, value.y, snakeWidth, snakeHeight);
            if(index == 0){
                if(collided(value.x, value.y)) {
                    gameOver();
                    
                }
                if(ateFood(value.x, value.y)){
                    console.log('Nämm');
                    score++;
                    $('#score').text("Skoor: " + score);
                    snakeBigger();
                    food.eaten = true;
                    newSpeed();
                }
                
            }
        });
    }

    function ateFood(x, y){
        return food.x == x && food.y == y;
    }
    function newSpeed(){
        speed = speed -100;  
    }

    function snakeBigger(){
        snake.push({
            x: snake[snake.length -1].oldX,
            y: snake[snake.length -1].oldY
        });
        
    }

    function collided(x, y){
        return snake.filter(function(value, index){
            return index != 0 && value.x == x && value.y == y;
        }).length > 0 || x < 0 || x > canvas.width || y < 0 || y > canvas.height;
    }

    function gameOver(){
        clearInterval(game);
        ctx.fillStyle = "white";
        ctx.font = "40px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
      
        ctx.fillStyle = gradient;

        ctx.fillText("Mäng läbi! Teie Skoor on " + score, canvas.width / 15, canvas.height / 2);
        $('#playAgain').show();
            //location.reload();
            
          
          //return
        }
        
    function drawFood(){
        ctx.fillStyle = 'red';
        if(food.eaten == true){
            food = getNewLocationForFood();
        }
        ctx.fillRect(food.x, food.y, snakeWidth, snakeHeight);
    }

    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    $(document).keydown(function(e){
        if($.inArray(e.which, [DOWN, UP, LEFT, RIGHT]) != -1){
            keyPressed = checkKeyIsAllowed(e.which);
        }
        console.log(keyPressed);
    });

    function checkKeyIsAllowed(tempKey){
        let key;
        if(tempKey == DOWN){
            key = (keyPressed != UP) ? tempKey : keyPressed;
        } else if(tempKey == UP){
            key = (keyPressed != DOWN) ? tempKey : keyPressed;
        } else if(tempKey == LEFT){
            key = (keyPressed != RIGHT) ? tempKey : keyPressed;
        } else if(tempKey == RIGHT){
            key = (keyPressed != LEFT) ? tempKey : keyPressed;
        }
        return key;
    }

    function getNewLocationForFood(){
        let newX, newY;
        newX = Math.floor(Math.random() * ((canvas.width - 10)/10))*10;
        newY = Math.floor(Math.random() * ((canvas.height - 10)/10))*10;
        return{
            x : newX,
            y: newY,
        };
    }

    $('#play').click(()=>{
        game = setInterval(gameLoop, speed);
            $('#playAgain').hide();
            $('#game').hide();
        }
    )
    $('#playAgain').click(()=>{
        location.reload();
        }
    )
});