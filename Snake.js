$(document).ready(function(){

    // Mängu alg andmed 
    var board = $("#board")[0];
    var cont = board.getContext("2d");
    var boardW = $("#board").width();
    var boardH = $("#board").height();

    var cellW = 10;
    var direction;
    var food;
    var score;
    

    var snake_body;

    //Mängu käivitus funktsioon
    function startUp(){

        $("#popup").css("display", "none"); //Mängu lõpetuse popup tehtakse nähtamatuks
        direction = "right";
        createSnake();
        createFood();
        score = 0;
        var scoreboard = document.getElementById("scoreboard");
        scoreboard.innerHTML = "Score: " + score;

        if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 100);
    }

    startUp();

    // Ussi loomis funktsioon. Loob ussi alati ülesse vasakule nurka
    function createSnake(){
        var snakeLength = 4;
        snake_body = [];

        for(var i = snakeLength-1; i>=0; i--){
            snake_body.push({x: i, y: 0});
        }
    }

    //Toidu loomis funktsioon
    function createFood(){
        food = {
			x: Math.round(Math.random()*(boardW-cellW)/cellW), 
			y: Math.round(Math.random()*(boardH-cellW)/cellW), 
		};

        
    }

    

    //Canvase joonistamise funktsioon
    function paint()
	{
        //Canvase taust joonistatake igal framel
		cont.fillStyle = "white";
		cont.fillRect(0, 0, boardW, boardH);
		cont.strokeStyle = "black";
		cont.strokeRect(0, 0, boardW, boardH);
		
		// Ussi liikumine
        var new_x = snake_body[0].x;
		var new_y = snake_body[0].y;
	
		if(direction == "right") new_x++;
		else if(direction == "left") new_x--;
		else if(direction == "up") new_y--;
		else if(direction == "down") new_y++;
		
		// Ussi kokkupõrge seina või iseendaga
		if(new_x == -1 || new_x == boardW/cellW || new_y == -1 || new_y == boardH/cellW || check_collision(new_x, new_y, snake_body))
		{
			$("#popup").css("display", "block"); // Mängu lõpu ekraan tehtakse nähtavaks
            snake_body = [];
            food = [];
			return;
		}

        // Pärast restardi klikimist alustatakse mäng uuesti
        $('#Restart').click(function(){
            startUp();
        });


		
		// Uss kasvab toiduga kokkupõrkel vastasel juhul popitakse ussi sabast üks cell ja see tõstetakse ussi peaks unshiftiga
		if(new_x == food.x && new_y == food.y)
		{
			var tail = {x: new_x, y: new_y};
			score++;
            var scoreboard = document.getElementById("scoreboard");
            scoreboard.innerHTML = "Score: " + score;
			
			createFood();

            // While loop mis kordab toidu loomist juhul, kui toit genereeritakse ussi sisse
            while(check_collision(food.x, food.y, snake_body)){
                createFood();
            }
		}
		else
		{
			var tail = snake_body.pop(); 
			tail.x = new_x; tail.y = new_y;
		}
		
		snake_body.unshift(tail); 
		
        // Ussi värvimiseks tehtud loop
		for(var i = 0; i < snake_body.length; i++)
		{
			var c = snake_body[i];
			
			paint_cell(c.x, c.y, "green");
		}
		
		
		paint_cell(food.x, food.y, "red");
		
	}

    // Cellide värvimiseks tehtud funktsioon
    function paint_cell(x, y, color)
	{
		cont.fillStyle = color;
		cont.fillRect(x*cellW, y*cellW, cellW, cellW);
		cont.strokeStyle = "white";
		cont.strokeRect(x*cellW, y*cellW, cellW, cellW);
	}


    // Kontrollib kas Uss on iseendaga kokku põrganud
    function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}

    // Nuppu vajutuse funktsioon suuna muutmiseks
    $(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
	})

})

