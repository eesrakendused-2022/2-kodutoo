$(document).ready(function() {

    let letter = "";
    let wordLength;
    let word = "";
    let lettersSplit = [];
    let uppercase = "";
    let numToMatch = 0;
    let stringword = "";
    let wrong = 6;
    let words = ["kass", "koer", "taevas", "arvuti", "pliiats", "vesi", "kuulilennutunneliteeluuk"];
    let results = [];
  
    $(".titulo").empty();
    //$(".draw").text("");
    $("button#btn1").attr("disabled", false);
    $(".draw").text("Elusid jäänud " + wrong);
    $(".keyboard > button").attr("disabled", true);
    $('#results').hide();
    loadFromFile();
    

    function loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

      //start
    $("#btn1").click(function() {
        let random = Math.floor(Math.random() * words.length);
        console.log(random);
        word = words[random];
        $("button").attr("disabled", false);
        lettersSplit = word.split("");
        wordLength = word.length;
        //console.log(wordLength);
        console.log(word);
        uppercase = word.toUpperCase();
        let cont = 0;
        while (cont < wordLength) {
            if (word.charAt(cont) == " ") {
                $("#word").append(" ");
            } else {
                $("#word").append("-");
            }
            cont++;
        }
        word = "";
    });

      //restart nupp
    $("#btn2").click(function() {
        $(".titulo").empty();
        $(".draw").empty();
        word = "";
        uppercase = "";
        lettersSplit = [];
        $(".keyboard > button").css('background-color', 'black');
        wrong = 6;
        $(".keyboard > button").attr("disabled", true);
        $("button#btn1").attr("disabled", false);
        saveResults();
    });

    
    $(".keyboard > button").click(function() {
        letter = $(this).text();
        $(this).attr("disabled", true);
        console.log(letter);
        console.log(uppercase);
        if (uppercase.includes(letter)) {
            var indices = [];
            for (var i = 0; i < uppercase.length; i++) {
                if (uppercase[i] === letter)
                    indices.push(i);
            }
            for (var j = 0; j < indices.length; j++) {
                numToMatch = indices[j];
                stringword = $("#word").html();
                stringword = setCharAt(stringword, numToMatch, letter);
                $("#word").text(stringword);
            }
            if (stringword.includes("-")) {} 
            else {
                $(".draw").text("Võit!");
                $("button").attr("disabled", true);
                $("button#btn1").attr("disabled", false);
                $("button#btn2").attr("disabled", false);
            }
            $(this).css('background-color', 'green');;
        } else {
            $(this).css('background-color', 'red');;
            wrong--;
            $(".draw").text("Elusid jäänud " + wrong);
            if (wrong <= 0) {
                wrong = 0;
                $(".draw").text("Kaotasid");
                if(($(".draw").text()) == "Kaotasid"){
                    $("#word").replaceWith("<p class='titulo'>" + uppercase + "</p>");
                    $("button").attr("disabled", true);
                    $("button#btn1").attr("disabled", false);
                    $("button#btn2").attr("disabled", false);
                }
            }
        }
    }); 

    function saveResults(){
        let result = {
            elud: wrong
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
    showResults();
});