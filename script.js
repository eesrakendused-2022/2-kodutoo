$(function () {

    //saving dom objects to variables
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole1 = $('#pole1');
    var pole2 = $('#pole2');
    var score = $('#score');
    var speed = $('#speed');
    var restart = $('#restart');

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;
    
    var the_game = setInterval(function () {
        var pole_current_position = parseInt(pole.css('right'));

        //check whether the poles went out of the container
        if (pole_current_position > container_width) {
            pole_current_position = pole_initial_position;
        }

        //move the poles
        pole.css('right', pole_current_position + speed);
    }, 40);
});