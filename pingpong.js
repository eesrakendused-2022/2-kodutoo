// AUTOR: KRISTJAN TAMM
class Pingpong{
    constructor(){

        this.speed = 30;
        
        this.right = document.getElementById('right');
        this.left = document.getElementById('left');
        this.ball = document.getElementById('ball');

        this.rscore = document.getElementById('scoreleft');
        this.lscore = document.getElementById('scoreright');
        this.ogoal = document.getElementById('goal');
        this.goalcontainer = document.getElementById('goalcontainer');

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.speedx = 6;
        this.speedy = 1;
        this.balltime = 1;
        this.ball.style.left = this.width / 2 + "px";

        this.results = [];

        this.goalcontainer.style.color = "black";
        
        this.loadFromFile();
        this.showResults();
        this.keypress();
        this.moveBall();
        
    }

    loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        });
    }

    nfp(urpx){
        return Number(urpx.replace("px", ""));
    }

    keypress(){
        
        $(document).on('keydown',(event)=> {
            // down arror
            if(event.which == 40) {
                if (this.nfp(this.right.style.top) + this.speed > this.height - 200){
                    this.right.style.top = this.height - 200 + "px";
                }
                else{
                    this.right.style.top = this.nfp(this.right.style.top) + this.speed + "px";
                }
                // up arrow
            } else if (event.which == 38){
                if (this.nfp(this.right.style.top) - this.speed < 0){
                    this.right.style.top = 0 + "px";
                }
                else{
                    this.right.style.top = this.nfp(this.right.style.top) - this.speed + "px";
                }
            }

            // s
            if(event.which == 83) {
                if (this.nfp(this.left.style.top) + this.speed > this.height - 200){
                    this.left.style.top = this.height - 200 + "px";
                }
                else{
                    this.left.style.top = this.nfp(this.left.style.top) + this.speed + "px";
                }
                // w
            } else if (event.which == 87){
                if (this.nfp(this.left.style.top) - this.speed < 0){
                    this.left.style.top = 0 + "px";
                }
                else{
                    this.left.style.top = this.nfp(this.left.style.top) - this.speed + "px";
                }
            }
        });
    }

    setBall() {
        this.ball.style.left = this.nfp(this.ball.style.left) + this.speedx + "px";
        this.ball.style.top = this.nfp(this.ball.style.top) + this.speedy + "px";
    }

    moveBall() {
        this.setBall();
    
        //remove overflow y
        if (this.height < this.nfp(this.ball.style.top) + 20 || this.nfp(this.ball.style.top) < 0) {
            this.speedy *= -1;
        }
    
        //overflow-x right
        if (this.nfp(this.ball.style.left) >= this.width - 50) {
            if (this.nfp(this.right.style.top) <= this.nfp(this.ball.style.top) + 20 && this.nfp(this.right.style.top) + 200 >= this.nfp(this.ball.style.top)) {
                this.speedx *= -1;
            } else if (this.nfp(this.ball.style.left) >= this.width - 20)
                this.goal('left');
        }
    
        //remove overflow x in left or get the goal in left
        if (this.nfp(this.ball.style.left) <= 30) {
            if (this.nfp(this.left.style.top) <= this.nfp(this.ball.style.top) + 20 && this.nfp(this.left.style.top) + 200 >= this.nfp(this.ball.style.top)) {
                this.speedx *= -1;
            } else if (this.nfp(this.ball.style.left) <= 0)
                this.goal('right');
        }
    
        setTimeout(() => {
            this.moveBall();
        }, this.balltime);
    }

    goal(pos) {

        this.goalcontainer.style.color = "white";
    
        setTimeout(()=> {
            this.goalcontainer.style.color = "black";
        }, 1000);
    
        if (pos == "left"){
            this.rscore.innerHTML = Number(this.rscore.innerHTML) + 1;
        }
        else{
            this.lscore.innerHTML = Number(this.lscore.innerHTML) + 1;
        }
    
        this.speedx *= -1;
        this.ball.style.left = this.width / 2 + "px";

        console.log(Number(this.lscore.innerHTML), Number(this.rscore.innerHTML));
        if(Number(this.lscore.innerHTML) == 2 || Number(this.rscore.innerHTML) == 2){ // siit saab muuta millal tulemused salvestatakse
            this.saveResults();
            this.lscore.innerHTML = this.rscore.innerHTML = 0;
        }
    
    }

    deleteResult(i){
        console.log(i + 'delete');
        this.results.splice(i, 1);
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
        $('#results').html("<p>Viimased tulemused</p><br>");
        if(this.results.length > 5){
            i = 0;
            this.deleteResult(i);
        }
        for(let i = 0; i < this.results.length; i++){
            if(i === 5){break;}
            $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + this.results[i].left + '</div><div> ' + this.results[i].right)
        }
    }

    saveResults(){
        let result = {
            left: Number(this.lscore.innerHTML),
            right: Number(this.rscore.innerHTML)
        }
        
        this.results.push(result);

        this.results.splice(5, 5);

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



let pingpong = new Pingpong();

