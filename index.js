class JumpKing{

    constructor(){
        this.audioElement = document.createElement('audio')
        this.audioElement.setAttribute('autoplay', 'autoplay')
        this.audioElement.muted = true
        super.king = $(".char")
        this.bottom = 60
        this.left = 600
        this.i = 0
        this.displayScore()
        this.jumpAudio = "./king_jump.wav"
        this.landAudio = "./king_land.wav"
        this.bumpAudio = "./king_bump.wav"
        this.name
        this.results = []
        this.time = 0
    }

    jump(height){
        let jumpDur = setInterval( ()=>{
            if(this.bottom > 200){
                clearInterval(jumpDur)
                let fallDur = setInterval( ()=>{
                    this.bottom -= 15
                    this.king.css({"bottom": this.bottom})
                    if(this.bottom < 65){
                        clearInterval(fallDur)
                        this.king.css({"bottom": 60})
                        this.audioElement.setAttribute('src', this.landAudio);
                        this.audioElement.play();
                    }
                }, 20)
            }
            this.audioElement.setAttribute('src', this.jumpAudio);
            this.audioElement.play();
            this.bottom += height;
            this.king.css({"bottom": this.bottom})
        }, 20);

    }

    moveRight(){
        if(this.left > 850){
            this.king.css({"left": 850})
            this.audioElement.setAttribute('src', this.bumpAudio);
            this.audioElement.play();
        }else{
            this.left += 10
            this.king.css({"left": this.left})
        }
    }

    moveLeft(){
        if(this.left < 420){
            this.king.css({"left": 420})
            this.audioElement.setAttribute('src', this.bumpAudio);
            this.audioElement.play();
        }else{
            this.left -= 10
            this.king.css({"left": this.left})
        }
    }

    jumpControls(e){
        // console.log(e.keyCode)
        if (e.keyCode === 87) {
             this.jump(20)
             this.king.removeClass("charBigjump")
             this.i ++
        }
    }

    bigJumpControls(e){
        if(e.keyCode === 119){
            this.king.addClass("charBigjump")
        }
    }

    moveControls(e) {
         if(e.keyCode === 100){
            this.moveRight()
        }else if(e.keyCode === 97){
            this.moveLeft()
        }
    }

    displayScore(){
        setInterval(()=>{
            $("#nJump").html(this.i)
            var value = parseInt($('#timer').find('.value').text(), 10)
            value = this.time
            this.time++
            $('#timer').find('.value').text(value)
        }, 1000)
    }

    enableAudio(){
        this.audioElement.muted = false;
    }

    disableAudio(){
        this.audioElement.muted = true;
    }

    saveResults(){
        let result = {
            name: this.name,
            time: this.time,
        }
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
        this.loadFromFile();
        $('#results').html("");
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break}
            $('#results').append('<div>' + (i+2) + '. ' + this.results[i].name + ': ' + this.results[i].time + 's</div')
        }
    }

    loadFromFile(){
        $.get("./database.txt", (data) => {
            this.results = JSON.parse(data);
            console.log(this.results)
            localStorage.setItem('score', this.results);
        });
    }

}

$('document').ready(function() {
    const p1 = new JumpKing()
    p1.loadFromFile()
    $(".game").hide()
    $(".stats").hide()
    $("#submit").on("click", ()=>{
        p1.name = $("#nameInput").val()
        $(".game").show()
        $(".gameMenu").hide()
        $(".stats").show()
        p1.enableAudio()
        p1.loadFromFile
        p1.showResults()
    })

    $(document).on('keyup', (e)=>p1.jumpControls(e));
    $(document).on('keypress', (e)=>p1.bigJumpControls(e));
    $(document).on('keypress', (e)=>p1.moveControls(e));

    $("#saveGame").on("click", ()=>{
        p1.saveResults()
        p1.i = 0
        p1.disableAudio()
        p1.time = 0
        $(".game").hide()
        $(".stats").hide()
        $(".gameMenu").show()
    })




});