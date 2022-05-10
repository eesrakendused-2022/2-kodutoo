class TicTacToe {
    constructor() {
        this.name1;
        this.name2;
        this.turn = 1;
        this.winner;
        this.results = [];

        this.loadFromFile();
        this.getNames();
        this.newGame();
    }

    loadFromFile() {
        $.get('results.txt', (data) => {
            try {
                let content = JSON.parse(data).content;
                this.results = content;
            } catch(e) {
                console.log(e);
            }
        });
    }

    saveResults() {
        let winnerName;

        if (this.winner === 'cross') {
            winnerName = this.name1;
        } else if (this.winner === 'circle') {
            winnerName = this.name2;
        } else {
            winnerName = this.winner;
        }

        let result = {
            name1: this.name1,
            name2: this.name2,
            winner: winnerName
        }

        this.results.push(result);

        if (this.results.length === 6) {
            this.results.splice(0, 1);
        }

        $.post('server.php', {
            save: this.results
        }).done(function() {
            console.log("Success");
        });

        this.showResults();
    }

    showResults() {
        $('#resultsDiv').html("<h2>5 viimast mängu</h2><br>");

        for (let i = 0; i < this.results.length; i++) {
            if (i === 5) {
                break;
            }

            if (this.results[i].winner === 'tie') {
                $('#resultsDiv').append('<span class="' + i +
                '"><p class="resultRow">' + this.results[i].name1 + " vs. " +
                this.results[i].name2 +
                ' <span class="tie">jäädi viiki</span></p></span>');

                $('.tie').css('color', 'yellow');
            } else {
                $('#resultsDiv').append('<span class="' + i +
                '"><p class="resultRow">' + this.results[i].name1 + " vs. " +
                this.results[i].name2 + ' <span class="win">võitis</span> ' +
                this.results[i].winner + "</p></span>");

                $('.win').css('color', '#00a86b');
            }
        }
    }

    getNames() {
        $('#submitNamesBtn').click(() => {
            this.name1 = $('#name1').val();
            this.name2 = $('#name2').val();

            if (!this.name1 || !this.name2) {
                $('#errorDiv').html("Sisesta mängijate nimed!").css('color', 'red');
            } else {
                $('#nameFormDiv').hide();
            }

            this.displayNames();
            this.showResults();
        });
    }

    displayNames() {
        $('#displayNamesDiv').html("Mängija " + this.name1 + " kord");

        $('button').click((e) => {
            if (e.target.className.includes('default')) {
                let buttonClass = e.target.className;

                if (this.turn === 1) {
                    this.changeTile(buttonClass);
                    this.turn = 2;

                    $('#displayNamesDiv').html("Mängija " + this.name2 + " kord");
                } else {
                    this.changeTile(buttonClass);
                    this.turn = 1;

                    $('#displayNamesDiv').html("Mängija " + this.name1 + " kord");
                }
            }
        });
    }

    changeTile(buttonClass) {
        buttonClass = buttonClass.replace(/ /g, '.');

        if (buttonClass.includes('default')) {
            if (this.turn === 1) {
                $('.' + buttonClass).removeClass('default').addClass('cross');
            } else {
                $('.' + buttonClass).removeClass('default').addClass('circle');
            }
        }

        this.hasGameFinished('cross');
        this.hasGameFinished('circle');
    }

    hasGameFinished(symbol) {
        if ($('.btn1').hasClass(symbol)
        && $('.btn2').hasClass(symbol)
        && $('.btn3').hasClass(symbol)) {
            $('.btn1, .btn2, .btn3').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn4').hasClass(symbol)
        && $('.btn5').hasClass(symbol)
        && $('.btn6').hasClass(symbol)) {
            $('.btn4, .btn5, .btn6').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn7').hasClass(symbol)
        && $('.btn8').hasClass(symbol)
        && $('.btn9').hasClass(symbol)) {
            $('.btn7, .btn8, .btn9').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn1').hasClass(symbol)
        && $('.btn4').hasClass(symbol)
        && $('.btn7').hasClass(symbol)) {
            $('.btn1, .btn4, .btn7').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn2').hasClass(symbol)
        && $('.btn5').hasClass(symbol)
        && $('.btn8').hasClass(symbol)) {
            $('.btn2, .btn5, .btn8').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn3').hasClass(symbol)
        && $('.btn6').hasClass(symbol)
        && $('.btn9').hasClass(symbol)) {
            $('.btn3, .btn6, .btn9').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn1').hasClass(symbol)
        && $('.btn5').hasClass(symbol)
        && $('.btn9').hasClass(symbol)) {
            $('.btn1, .btn5, .btn9').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if ($('.btn3').hasClass(symbol)
        && $('.btn5').hasClass(symbol)
        && $('.btn7').hasClass(symbol)) {
            $('.btn3, .btn5, .btn7').css('background-color', 'green');

            this.winner = symbol;
            this.displayWinner();
            this.saveResults();
        } else if (!$('button').hasClass('default')
        && this.winner === undefined) {
            $('button').css('background-color', 'yellow');

            this.winner = "tie";
            this.displayWinner();
            this.saveResults();
        }
    }

    displayWinner() {
        $('#displayNamesDiv').hide();

        if (this.winner === 'cross') {
            $('#displayWinnerDiv').html("Võitis mängija " + this.name1 + " (ristid)");
        } else if (this.winner === 'circle') {
            $('#displayWinnerDiv').html("Võitis mängija " + this.name2 + " (ringid)");
        } else if (this.winner === 'tie') {
            $('#displayWinnerDiv').html("Viik");
        }

        this.disableTiles();
    }

    disableTiles() {
        if ($('button').hasClass('default')) {
            $('button').removeClass('default').addClass('disabled');
        }
    }

    newGame() {
        $('#newGameBtn').click(() => {
            $('button').removeClass('disabled cross circle').addClass('default');
            $('button').css('background-color', 'white');
            $('#displayWinnerDiv').html("");
            $('#displayNamesDiv').show();

            this.turn = 1;
            this.winner = undefined;
            this.displayNames();
        });
    }
}

let ticTacToe = new TicTacToe();