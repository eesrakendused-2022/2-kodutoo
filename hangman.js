let words = ["kass", "koer", "taevas", "arvuti", "pliiats", "vesi", "kuulilennutunneliteeluuk"];
let word = [];
let buttons = [];
let wrongGuesses= 0;
let rightGuesses= 0;
let gameOver = false;
let results = [];
startGame();

function randomWord(){
    let random = Math.floor(Math.random() * words.length);
    let randomWord = words[random];
    console.log(randomWord);
    word = randomWord.split("");
    console.log(word);
}
randomWord();

function wordSpaces() {
    for (let i = 0; i < word.length; i++) {
      $(".word-spaces > tbody > tr").append('<td data-index=' + word[i] +'>' + word[i] + '</td>')
        let boxIndex = $(this).data('data-index');
        console.log(boxIndex);
    }
}
wordSpaces();

function startGame() {
    $('.btn').click(function(){
        let index = $(this).data('index');
        console.log(index);
        for (let j = 0; j < word.length; j++){
            if (word[j] == index){
                $('.word-spaces td').css('color','black');
                $(this).css('background-color', 'green');
                $(this).prop('disabled', true);
                //alert(index);
                rightGuesses++; 
                console.log(rightGuesses);
                break;
            } else {
                $(this).css('background-color', 'red');
                $(this).prop('disabled', true);
                wrongGuesses++;
                $("#lives").html(wrongGuesses);
                break;
                
            }
        }
        endGame();
    });
    
}


function endGame(){
    if(wrongGuesses >= 6 || rightGuesses == 1){
    $("#status").html("Mäng on läbi");
    $('.btn').prop('disabled', true);
    saveResults();
    }
}

function loadFromFile(){
    $.get("database.txt", (data) => {
        let content = JSON.parse(data).content;
        console.log(content);
        results = content;
        localStorage.setItem('score', JSON.stringify(content));
    }); 
}


function saveResults(){
    let result = {
        elud: wrongGuesses
    }
        results.push(result);

        results.splice(10, 10);

        localStorage.setItem('score', JSON.stringify(results));

        $.post('server.php', {save: results}).done(function(){
            console.log('Success');
        }).fail(function(){
            alert('FAIL');
        }).always(
            function(){
                console.log('Tegime midagi AJAXiga');
            }
        )

    showResults();
}


function showResults(){
    $('#results').html("");
    for(let i = 0; i < results.length; i++){
        if(i === 10){break;}
        $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + results[i].elud + '</div><div> ');
    }
}
loadFromFile();
showResults();

