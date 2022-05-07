$(document).ready(function(){
	var canvas = $('#canvas')[0];
	var context = canvas.getContext('2d');
	var width = $('#canvas').width();
	var height = $('#canvas').height();	
	var cell_width = 10;
	var run;
	var ussi_sook;
	var score;
	var uss_array;
    
    function uus_sook(){
		ussi_sook = {
			x: Math.round(Math.random() * (width - cell_width) / cell_width),
			y: Math.round(Math.random() * (height - cell_width) / cell_width)
		};
	}
 
	function uus_uss(){
		var ussi_suurus = 3;
		uss_array = [];
		for(var m = 0; m < ussi_suurus; m++){
			uss_array.push({x: 45, y: 14});
		}
	}
	
	function config(){
 		manguruumi_varv();
 
		var pop_x = uss_array[0].x;
		var pop_y = uss_array[0].y;
 
		switch(run){
			case "right":
				pop_x++;
				break;
			case "left":
				pop_x--;
				break;
			case "down":
				pop_y++;
				break;
			case "up":
				pop_y--;
				break;
		}
 
 		if(pop_x == -1 || pop_x == width / cell_width || pop_y == -1 || pop_y == height / cell_width || collision(pop_x, pop_y, uss_array)){
			start();
			return;
		}
 
		if(pop_x == ussi_sook.x && pop_y == ussi_sook.y){
			var ussi_saba = {x: pop_x, y: pop_y};
			score += 1;
			uus_sook();
		}else{
			var ussi_saba = uss_array.pop();
			ussi_saba.x = pop_x;
			ussi_saba.y = pop_y;
 		}
 
		uss_array.unshift(ussi_saba);
 
		for (var i = 0; i < uss_array.length; i++){
			var c = uss_array[i];
			ussi_keha(c.x, c.y);
		}
 
		ussi_keha(ussi_sook.x, ussi_sook.y);
 
		var score_text = "Score: " + score;
		
		context.fillText(score_text, 5, 10);
		context.fillText(title, 0, height-2);
	}
 
	function ussi_keha(x, y){
		context.fillStyle = "#ffffff";
		context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
		context.strokeStyle = "#000000";	
		context.strokeRect(x * cell_width, y * cell_width, cell_width, cell_width);
	}
	
	function manguruumi_varv(){
		context.fillStyle = "green";
		context.fillRect(0, 0, width, height);
		context.strokeStyle = "#000000";
		context.strokeRect(0, 0, width, height);
 	}
 
	function collision(x, y, array){
			for(var i = 0; i < array.length; i++){
				if(array[i].x == x && array[i].y == y){
					return true;
				}
			}
			return false;
		}
 
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "40" && run != "up"){
			run = "down";
		}
		else if(key == "39" && run != "left"){
			run = "right";
		}
		else if(key == "38" && run != "down"){
			run = "up";
		}
		else if(key == "37" && run != "right"){
			run = "left";
		}
	})
 
	start();
 
	function start(){
		run = "left";
		uus_uss();
		uus_sook();
		score = 0;
 
		if(typeof game_start != "undefined")clearInterval(game_start);
		game_start = setInterval(config, 60);
	}
});