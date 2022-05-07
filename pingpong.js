/* 
class Pingpong{
    constructor(){
        this.speed = 15;
        this.r = document.getElementById('right');
        this.l = document.getElementById('left');
        this.b = document.getElementById('ball');

        this.rscore = document.getElementById('scoreleft');
        this.lscore = document.getElementById('scoreright');
        this.ogoal = document.getElementById('goal');

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.key = []; // Or you could call it "key"
    }

    nfp(urpx) {
        return Number(urpx.replace("px", ""))
    }

    onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        this.key[e.keyCode] = e.type == 'keydown';
    }
    

    keydown() {
       //if key was up arrow
        if (this.key[40]) {
            if (nfp(this.r.style.top) + this.speed > this.h - 200){
                this.r.style.top = this.h - 200 + "px";
            }
                
            else{
                this.r.style.top = nfp(this.r.style.top) + this.speed + "px";
            }
        }



        //if key was down arrow
        else if (key[38]) {
            if (nfp(r.style.top) - ps < 0){
                r.style.top = 0 + "px";
            }
            else{
                r.style.top = nfp(r.style.top) - ps + "px";
            }
        }
    
        //40 down, 38 up
        //w 87,s 83
    }
}

let pingpong = new Pingpong();

 */

class Pingpong{
    constructor(){
        
        this.keypress();
    }

    nfp(urpx){
        return Number(urpx.replace("px", ""));
    }

    keypress(){
        $(document).on('keypress',function(event) {
            if(event.which == 13) {
                this.test();
            }
        });
    }

    

    
    test(){
        var speed = 15;
        
        var r = document.getElementById('right');
        console.log("pressed enter")
        if (this.nfp(r.style.top) - speed < 0){
            r.style.top = 0 + "px";
            console.log("1");
        }
        else{
            r.style.top = this.nfp(r.style.top) - speed + "px";
            console.log("2");
        }
    }
    
    

    
    

    kirjuta(keypressed){
        console.log(keypressed)
        var speed = 15;
        var r = document.getElementById('right');
        this.l = document.getElementById('left');
        this.b = document.getElementById('ball');

        this.rscore = document.getElementById('scoreleft');
        this.lscore = document.getElementById('scoreright');
        this.ogoal = document.getElementById('goal');

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        if (keypressed == 's') {
            
            if (this.nfp(r.style.top) - speed < 0){
                r.style.top = 0 + "px";
            }
            else{
                r.style.top = this.nfp(r.style.top) - speed + "px";
            }
        }
        }
    }

let pingpong = new Pingpong();

