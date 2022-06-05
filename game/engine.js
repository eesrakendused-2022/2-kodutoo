export default class Engine {
    
    score
    snakeGame
    gameContext
    snakeCoords
    candyCoords
    pressedKey = 'ArrowRight'
    offsetX = 20
    offsetY = 0

    constructor(){
        this.snakeGame = $('#snakeGame')[0];
        this.gameContext = snakeGame.getContext('2d')
        this.gameContext.fillStyle = 'white';
        this.gameContext.fillRect(0, 0, this.snakeGame.width, this.snakeGame.height)
        this.snakeCoords = [{x:200, y:200}, {x:180, y:200}, {x:160, y:200}]
        this.score = 0
       
        $(document).keydown(event => {
            if (event.key == 'ArrowUp'){
                this.keyPressValidation('ArrowUp')
            }
            if (event.key == 'ArrowDown'){
                this.keyPressValidation('ArrowDown')
            }
            if (event.key == 'ArrowLeft'){
                this.keyPressValidation('ArrowLeft')
            }
            if (event.key == 'ArrowRight'){
                this.keyPressValidation('ArrowRight')
            }
          });
    }

    keyPressValidation(key) {
        if(key == 'ArrowUp' && this.pressedKey != 'ArrowDown'){
            this.offsetX = 0
            this.offsetY = -20
            this.pressedKey = 'ArrowUp'
        }
        if(key == 'ArrowDown' && this.pressedKey != 'ArrowUp'){
            this.offsetX = 0
            this.offsetY = 20
            this.pressedKey = 'ArrowDown'
        }
        if(key == 'ArrowLeft' && this.pressedKey != 'ArrowRight'){
            this.offsetX = -20
            this.offsetY = 0
            this.pressedKey = 'ArrowLeft'
        }
        if(key == 'ArrowRight' && this.pressedKey != 'ArrowLeft'){
            this.offsetX = +20
            this.offsetY = 0
            this.pressedKey = 'ArrowRight'
        }
    }

    generateCandy() {
        let candyGeneratedSuccessfully = false
        while(!candyGeneratedSuccessfully){
            this.candyCoords = {x: (Math.floor(Math.random() * 20)*20), y: (Math.floor(Math.random() *20)*20)}
            if(!this.snakeCoords.some(item => item.x === this.candyCoords.x && item.y === this.candyCoords.y)){
                this.gameContext.fillStyle = 'red'
                this.gameContext.fillRect(this.candyCoords.x, this.candyCoords.y, 20, 20)
                candyGeneratedSuccessfully = true
            }
        }
    }

    draw() {
        this.gameContext.fillStyle = 'green'  
        this.snakeCoords.forEach(elem => {
            this.gameContext.fillRect(elem.x, elem.y, 20, 20)
        })
        if(jQuery.isEmptyObject(this.candyCoords)){
            this.generateCandy();
        }
    }

    reset() {
        this.gameContext.fillStyle = 'white';
        this.gameContext.fillRect(0, 0, this.snakeGame.width, this.snakeGame.height)
        this.snakeCoords = [{x:200, y:200}, {x:180, y:200}, {x:160, y:200}]
        this.candyCoords = {}
        this.score = 0
    }

    checkDidEat(){
        if (this.snakeCoords[0].x === this.candyCoords.x && this.snakeCoords[0].y === this.candyCoords.y) {
            this.gameContext.fillStyle = 'white';
            this.gameContext.fillRect(this.candyCoords.x, this.candyCoords.y, 20, 20);
            let len = this.snakeCoords.length
            this.snakeCoords.push({x: (this.snakeCoords[len-1].x-(this.snakeCoords[len-2].x-this.snakeCoords[len-1].x)), y: (this.snakeCoords[len-1].y-(this.snakeCoords[len-2].y-this.snakeCoords[len-1].y))})
            this.candyCoords = {}
            this.score += 1
        }
    }

    checkBorderCollision(){
        if(this.snakeCoords[0].x < 0 || this.snakeCoords[0].x > 380 || this.snakeCoords[0].y < 0 || this.snakeCoords[0].y > 380){
            this.gameOver()
        }
    }

    checkBodyCollision(){
        this.snakeCoords.forEach((elem,i) => {
            if(i!=0){
                if(this.snakeCoords[0].x == elem.x && this.snakeCoords[0].y == elem.y){this.gameOver()}
            }
        })
    }

    move() {
        this.checkDidEat()

        this.snakeCoords.forEach((elem)  => {
            this.gameContext.fillStyle = 'white'
            this.gameContext.fillRect(elem.x, elem.y, 20, 20);
        })

        this.snakeCoords.unshift({x: this.snakeCoords[0].x+this.offsetX, y: this.snakeCoords[0].y+this.offsetY})
        this.snakeCoords.pop()

        this.draw()

        this.checkBorderCollision()
        this.checkBodyCollision()
    }

    gameOver() {
        localStorage.setItem('gameOn',false)
        alert('Game Over! Score: ' + this.score)
        this.submitScore()
        this.reset()
    }

    submitScore(){
        let name = prompt("Please enter your name! (Or press cancel)");
        if (name) {
            let result = {
                name: name,
                score: this.score,
            }
            $.post('server.php', {save: result})
        }

    }

    getDb(){
        $.get("./db.txt", (data) => {
            let clearData = data.replaceAll('}}', '}},') 
            clearData = "[" + clearData
            clearData = clearData.slice(0, -1)
            clearData = clearData.slice(0, -1)
            //clearData = clearData.slice(0, -1)
            clearData = clearData + "]"
            localStorage.setItem('results', clearData)
        })
    }

    showResults() {
        this.getDb()

        let results = localStorage.getItem('results')
        if(results == ']'){
            $('#scoreBoard').append('<div>Be first! :)</div>')
            return
        }
        
        results = JSON.parse(results)
        results.sort(function(a, b){
            return b.content.score - a.content.score
        });

        $('#scoreBoard').html("");
        for(let i = 0; i < results.length; i++){
            if(i === 10){break}
            $('#scoreBoard').append('<div>' + (i+1) + '. ' + results[i].content.name + ': ' + results[i].content.score + '</div>')
        }
    }
}
