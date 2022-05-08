
class Pingpong{
    constructor(){

        this.speed = 30;
        
        this.right = document.getElementById('right');
        this.left = document.getElementById('left');
        this.ball = document.getElementById('ball');

        this.rscore = document.getElementById('scoreleft');
        this.lscore = document.getElementById('scoreright');
        this.ogoal = document.getElementById('goal');

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.speedx = 6;
        this.speedy = 1;
        this.balltime = 1;
        this.ball.style.left = this.width / 2 + "px";
        
        $('#goal').hide();
        this.keypress();
        this.moveBall();
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

        $('#goal').show();
    
        setTimeout(()=> {
            $('#goal').hide();
        }, 1000);
    
        if (pos == "left"){
            this.rscore.innerHTML = Number(this.rscore.innerHTML) + 1;
        }
        else{
            this.lscore.innerHTML = Number(this.lscore.innerHTML) + 1;
        }
    
        this.speedx *= -1;
        this.ball.style.left = this.width / 2 + "px";
    
    }
}



let pingpong = new Pingpong();

