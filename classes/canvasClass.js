class canvasClass {
    canvas;
    context;

    height;
    width;
    gameFPS;

    clicking = false;
    lineStart = [];
    lineEnd = [];

    circlePos = [0, 0];
    circleSpeed = 3;
    speedMultiplier = 2;
    circleCollisionPixels = [
        [-14.0, 0.0],   //left
        [13.0, 0.0],    //right
        [-12.0, 7.0],   //down left
        [11.0, 7.0],    //down right
        [0.0, 13.0],    //down
    ]

    winZone;

    constructor(htmlID, FPS, speedMultiplier) {
        this.canvas = $(htmlID).get(0);
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.gameFPS = FPS;
        this.speedMultiplier = speedMultiplier;
        this.resizeCanvas($(window).width(), $(window).height());
        this.changeSpeed();
    }

    updateSettings(newFPS, newMultiplier) {
        this.gameFPS = newFPS;
        this.speedMultiplier = newMultiplier;
        this.changeSpeed();
    }

    resizeCanvas(w, h) {
        this.width = w / 1.5;
        this.height = h / 1.5;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.changeSpeed();
    }

    changeSpeed() {
        this.circleSpeed = this.height / (this.gameFPS * this.speedMultiplier);
    }

    startClick(x, y) {
        this.clicking = true;
        this.lineStart = [x, y];
        this.lineEnd = [x, y];
    }

    moveMouse(x, y) {
        if (this.clicking) {
            this.lineEnd = [x, y];
        }
    }

    endClick() {
        this.clicking = false;
    }

    clearLine() {
        this.lineStart = [];
        this.lineEnd = [];
    }

    renderLine() {
        this.context.lineWidth = 10;
        this.context.beginPath();
        this.context.strokeStyle = "gray";
        if (this.clicking) {
            this.context.strokeStyle = "lightgray";
        }
        this.context.moveTo(this?.lineStart[0], this?.lineStart[1]);
        this.context.lineTo(this?.lineEnd[0], this?.lineEnd[1]);
        this.context.stroke();
    }

    renderCircle() {
        this.context.lineWidth = 5;
        this.context.beginPath();
        this.context.strokeStyle = "black";
        this.context.arc(this?.circlePos[0], this?.circlePos[1], 10, 0, 2 * Math.PI);
        this.context.stroke();
    }

    renderWinZone() {
        this.context.fillStyle = "lightgreen";
        this.context.fillRect(this.winZone, this.height - 10, 50, 10);
    }

    //works only as a visual to show what pixels are checked for collision
    renderCollisionPixels() {
        this.context.fillStyle = "red";
        this.circleCollisionPixels.forEach((pixels) => {
            this.context.fillRect(this.circlePos[0] + pixels[0], this.circlePos[1] + pixels[1], 1, 1);
        });
    }

    render() {
        this.clearCanvas();
        this.renderLine();
        this.renderCircle();
        this.renderWinZone();
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    physics() {
        let circleX = this.circlePos[0];
        let circleY = this.circlePos[1];
        //out of canvas
        if (circleY > this.height + 10) {
            return gameLose();
        }
        //in win zone
        if(this.isCircleInWinZone()) {
            return gameWin();
        }
        //colliding with player-drawn line
        if (this.isCircleCollidingWithLine()) {
            const lengthData = this.getVectorLengthData(this.lineStart, this.lineEnd);
            const xLength = lengthData[0];
            const yLength = lengthData[1];
            const direction = (lengthData[2] == true ? 1.5 : -1.5);
            const xMultiplier = xLength / (xLength + yLength);
            const yMultiplier = yLength / (xLength + yLength);
            circleX += (direction * this.circleSpeed * xMultiplier) * 0.666;
            circleY += (this.circleSpeed * yMultiplier) * 0.333;
            this.normalizeCirclePosition();
        } else {
            circleY += 1 * this.circleSpeed;
        }
        this.circlePos = [circleX, circleY];
    }

    normalizeCirclePosition() {
        this.circlePos[1];
        while (this.isCircleCollidingWithLine()) {
                this.circlePos[1] += -0.25 * this.circleSpeed;
            }
    }

    isCircleCollidingWithLine() {
        let colorDataArray = [];
        let colorData = [];
        this.circleCollisionPixels.forEach((pixels) => {
            colorDataArray.push(this.getCollisionPointData(pixels[0], pixels[1]));
        })
        for(let i = 0; i < colorDataArray.length; i++) {
            colorData = colorDataArray[i];
            //checks whether the rbg color is "gray"
            if (colorData[0] == colorData[1] &&
                colorData[0] == colorData[2] &&
                colorData[0] == 128) {
                    return true;
                }
        }
        return false;
    }

    isCircleInWinZone() {
        let colorDataArray = [];
        let colorData = [];
        this.circleCollisionPixels.forEach((pixels) => {
            colorDataArray.push(this.getCollisionPointData(pixels[0], pixels[1]));
        })
        for(let i = 0; i < colorDataArray.length; i++) {
            colorData = colorDataArray[i];
            //checks whether the rbg color is "lightgreen"
            if (colorData[1] == 238 &&
                colorData[0] == colorData[2] &&
                colorData[0] == 144) {
                   return true;
            }
        }
        return false;
    }

    //returns the rgba values array from the given point near the circle's position
    getCollisionPointData(xAddition, yAddition) {
        const arg1 = Math.round(this?.circlePos[0] + xAddition);
        const arg2 = Math.round(this?.circlePos[1] + yAddition);
        let colorData;
        /*console.log(`
           ${Math.round(this?.circlePos[0])} +
           ${Math.round(this?.circlePos[1])} +
           ${xAddition} +
           ${yAddition}!
        `);*/
        if(!this.clicking) {
            const canvasData = this.context.getImageData(
                arg1,
                arg2,
                1, 1);
            colorData = canvasData.data;
        } else {
            colorData = [0, 0, 0, 255];
        }
        return colorData;
    }

    //returns some data about the line player has drawn
    getVectorLengthData(pointA, pointB) {
        const x1 = (pointA[0] > pointB[0] ? pointB[0] : pointA[0]);
        const x1FromPointA = (x1 == pointA[0]);
        const y1 = (x1FromPointA ? pointA[1] : pointB[1]);
        const x2 = (x1FromPointA ? pointB[0] : pointA[0]);
        const y2 = (x1FromPointA ? pointB[1] : pointA[1]);

        const xLength = x2 - x1;
        const yLength = y2 - y1;
        
        const vectorFallingRight = (y2 > y1 ? true : false);
        return [xLength, Math.abs(yLength), vectorFallingRight];
    }

    //generate new circle start position and new green win zone
    newLevel() {
        const newCircleX = this.getRandomInt(25, (this.width) - 25);
        const newCircleY = this.getRandomInt(25, (this.height / 5) - 25);
        this.circlePos = [newCircleX, newCircleY];
        this.winZone = this.getRandomInt(0, this.width - 50);
    }

    //random integer function, both min and max are included
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}