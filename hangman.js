let words = ["kass", "koer", "taevas", "arvuti", "pliiats", "vesi"];
let word = [];
let buttons = [];
let wrongGuesses= 0;
let rightGuesses= 0;
let gameOver = false;
let results = [];

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
      $(".word-spaces > tbody > tr").append('<td data-idx=i>' + word[i] + '</td>')
    }
}
wordSpaces();


$("button").click(function() {
    for (let j = 0; j < word.length; j++){
        console.log(word[j]);
        if (word[j] == this.id){
            $('.word-spaces td').css('color','black');
            alert(this.id);
            rightGuesses++; 
            break;
        } 
    }
 
});

function endGame(){
    if(wrongGuesses >= 6 || rightGuesses == word.length){
    $("body").css("background-color", "#ff4500");
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
loadFromFile();

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
saveResults();

function showResults(){
    $('#results').html("");
    for(let i = 0; i < results.length; i++){
        if(i === 10){break;}
        $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + results[i].elud + '</div><div> ');
    }
}
showResults();
