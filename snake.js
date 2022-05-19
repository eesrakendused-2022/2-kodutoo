$(document).ready(function () {

    let canvas = $('#board')[0];
    let ctx = canvas.getContext('2d');
    const width = $('#board').width();
    const height = $('#board').height();
    const square = 20;
    let snake = [];
    let food;
    let snakeColor = '#FF0000';
    let foodColor = '#ffffff';
    let direction;
    let gameScore = 0;
    let snakePosX;
    let snakePosY;
    let tail;
    let username;


    function spawnSnake() {
        let snakeSize = 3;
        snake = [];
        for(let i = 0; i < snakeSize; i++) {
            snake.push({
                x: 8,
                y: 8
            });
        }
    }

    function spawnFood() {
        food = {
            x: Math.round(Math.random() * (width - square) / square),
            y: Math.round(Math.random() * (height - square) / square)
        }
    }


    function gameLogic(){

        gameBoard();

        snakePosX = snake[0].x;
        snakePosY = snake[0].y;

        if (direction == 'right') snakePosX++;
        else if (direction == 'left') snakePosX--;
        else if (direction == 'up') snakePosY--;
        else if (direction == 'down') snakePosY++;

        if(snakePosX == -1 || snakePosX == width / square || snakePosY == -1 || snakePosY == height / square || snakeCollision(snakePosX, snakePosY, snake)) {
                $('#gameOverModal').show();
                $('#gameOverMessage').text(username + ' - Your score is ' + gameScore);
                $('#restart').click(function () {
                    location.reload();
                    });
            return;
        }

        if(snakePosX == food.x && snakePosY == food.y) {
            tail = {
                x: snakePosX,
                y: snakePosY
            }
            gameScore += 5;
            spawnFood();

        }else{
            tail = snake.pop();
            tail.x = snakePosX;
            tail.y = snakePosY;
        }

        snake.unshift(tail);

        if(snakePosX == food.x && snakePosY == food.y) {
            snake.push({
                x: snakePosX,
                y: snakePosY
            })
            spawnFood();
        }

        for(let i = 0; i < snake.length; i++){
            drawSnake(snake[i].x, snake[i].y, snakeColor);
        }

        drawSnake(food.x, food.y, foodColor);


        $(document).keydown(function (e) {
            let key = e.which;
            if (key == 37 && direction != 'right') direction = 'left';
            else if (key == 38 && direction != 'down') direction = 'up';
            else if (key == 39 && direction != 'left') direction = 'right';
            else if (key == 40 && direction != 'up') direction = 'down';

        })

        $('#score').show().text(username + ' - Your score is: ' + gameScore);

    }


    function gameBoard() {
        let colorOrder = 0;
        const colors = Array("#000000;");
        for (let i = 0; i < 30; i++) {
            for (j = 0; j < 30; j++) {
                ctx.fillStyle = colors[colorOrder];
                ctx.fillRect(square * j, square * i, 20, 20);
                colorOrder++;
                if (colorOrder == 2) {
                    colorOrder = 0;
                }
            }
            ctx.fillStyle = colors[colorOrder];
            ctx.fillRect(0, square * j, 20, 20);
            colorOrder++;
            if (colorOrder == 2) {
                colorOrder = 0;
            }
        }
    }


    function drawSnake(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * square, y * square, square, square);
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(x * square, y * square, square, square);
    }


    function snakeCollision(x, y, arr){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].x == x && arr[i].y == y){
                return true;
            }
        }
        return false;
    }


    function startGame(){
        gameScore = 0;
        direction = 'right';
        spawnSnake();
        spawnFood();
        $('#playGame').click(function () {
            $('#startGameModal').hide();
        });

        if (typeof gameInterval != 'undefined') clearInterval(gameInterval); {
            beginGame = setInterval(gameLogic, 120);
        }
    }


        $('#playGame').click(function () {
            username = $('#nameInput').val();
            if(username != undefined && username != ''){
                console.log(username);
                $('#startGameModal').hide();
                startGame();
            }else{
                alert('Please enter a username');
            }
        })


}); 