class ReactionGame {
    constructor() {
        this.start = new Date().getTime();
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.countShapes = 0;
        this.timeTaken = 0;
        this.timeCount = 0;
        this.results = [];

        this.startGame();
    }

    startGame() {
        $('#startButton').click(() => {
            $('#startPage').hide();
            $('#gamePage').show();
            this.appearAfterDelay();
            this.shapeClicker();
        });
    }

    appearAfterDelay() {
        setTimeout(this.shapeDisplay(), Math.random() * 1000);
    }

    shapeDisplay() {
        let top = Math.random() * (this.screenHeight * 0.8);
        let left = Math.random() * (this.screenWidth * 0.8);
        let width = (Math.random() * 200) + 100;

        if (Math.random() > 0.5) {
            $('#shape').css('border-radius', '50%');
        } else {
            $('#shape').css('border-radius', '0');
        }

        $('#shape').css('background-color', this.getRandomColor())
            .css('width', width + 'px')
            .css('height', width + 'px')
            .css('top', top + 'px')
            .css('left', left + 'px')
            .css('display', 'block');

        this.start = new Date().getTime();
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    shapeClicker() {
        $('#shape').click(() => {
            this.countShapes += 1;
            if (this.countShapes < 10) {
                $('#shape').hide();
                let end = new Date().getTime();
                this.timeTaken = (end - this.start) / 1000;
                this.timeCount += this.timeTaken;
                $('#time').html(': ' + this.timeTaken.toFixed(2) + "s");
                this.appearAfterDelay();
            } else {
                $('#shape').css('display', 'none');
                let end = new Date().getTime();
                this.timeTaken = (end - this.start) / 1000;
                this.timeCount += this.timeTaken;
                $('#gamePage').hide();
                $('#resultPage').show();
                $('#resultTime').html(this.timeCount.toFixed(2));
                this.saveResults();
                this.newGame();
            }
        });
    }

    newGame() {
        $('#newGameButton').click(() => {
            this.countShapes = 0;
            this.timeTaken = 0;
            this.timeCount = 0;
            $('#resultPage').hide();
            $('#gamePage').show();
            this.appearAfterDelay();
        });
    }

    // suhtluses serveriga on kasutatud koodi typer'i mängust ja seda vajadusele vastavalt modifitseeritud
    retrieveFromFile() {
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        });
    }

    saveResults() {
        let result = {
            time: this.timeCount.toFixed(2)
        };

        this.results.push(result);
        this.sortResults();
        // salvestame vahemälusse
        localStorage.setItem('score', JSON.stringify(this.results));
        // postitame faili serverisse
        $.post('server.php', { save: this.results }).done(function () { console.log('Success!'); }).fail(function () {
            alert('FAIL!');
        });

        this.showResults();
    }

    sortResults() {
        // järjestame aja järgi
        this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
    }

    showResults() {
        $('#results').html('');
        this.sortResults();
        for (let i = 0; i < this.results.length; i++) {
            // et kuvataks ainult 10 tulemust, juhul kui on rohkem
            if (i === 11) { break; }
            // näidatakse sekundeid, ei teisenda minutiteks, et oleks parem võrrelda
            $('#results').append((i + 1) + '. ' + this.results[i].time + ' sek. <br>');
        }
    }


}

let reactionGame = new ReactionGame();