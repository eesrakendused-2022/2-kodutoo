
const grid = $('#grid');
let playerName = "";
let rows = 10;
let cols = 10;
let bombProbability = 0.1;
let bombCount = 10;
startTime = 0;
endTime = 0;
results = [];

function createGrid(rows, cols){
    grid.empty();
    for (let i = 0; i < rows; i++) {
        const row = $('<div>').addClass('row');
        for (let j = 0; j < cols; j++) {
            const col = $('<div>').addClass('col hidden').attr('data-row', i).attr('data-col', j); 
/*             if(Math.random() < bombProbability){
                col.addClass('mine');
            } */
            row.append(col)
            
        }
        grid.append(row);
        
    }

    

    
    for (let i = 0; i < bombCount; i++) {
         
        let rowRand = Math.floor(Math.random() * rows);
        let colRand = Math.floor(Math.random() * cols);
        console.log(rowRand)
        let bombPlace = $(`.col.hidden[data-row=${rowRand}][data-col=${colRand}]`);
        console.log(bombPlace)

        if(bombPlace.hasClass('mine')){
            i--;
        }else{
            bombPlace.addClass('mine');
        }

    }
    
}

function addMine(){
        let rowRand = Math.random(0, rows);
        let colRand = Math.random(0, cols);
        let bombPlace = $(`.col.hidden[data-row=${rowRand}][data-col=${colRand}]`)
        console.log(bombPlace)

        if(bombPlace.hasClass('mine')){
            addMine();
        }else{
            bombPlace.addClass('mine');
        }

}

function loadFromFile(){

    $.get("database.txt", (data) => {
        let content = JSON.parse(data).content;
        results = content;
        localStorage.setItem('score', JSON.stringify(content));
    });
    console.log("Files loaded");

}


$('#submitLevel').click(()=>{playerName = $('#nameValue').val();
    let radioValue = $('input[name="level"]:checked').val();
    console.log(radioValue);
    if(radioValue === "easy"){
        rows = 10;
        cols = 10;
        bombCount = 10;
    }else if(radioValue === "medium"){
        rows = 15;
        cols = 15;
        bombCount = 30;
    }else if(radioValue === "hard"){
        rows = 20;
        cols = 20;
        bombCount = 80;
    }
    console.log(rows);

    createGrid(rows, cols);

    $('#name').hide();

});

$('#submitReplay').click(()=>{
   
    $('#winScreen').hide(); 
    restart()

});


$('#submitLevelChange').click(()=>{

    $('#winScreen').hide();
    $('#name').show();

});

$('#submitReplayLose').click(()=>{
   
    $('#loseScreen').hide(); 
    restart()

});


$('#submitLevelChangeLose').click(()=>{

    $('#loseScreen').hide();
    $('#name').show();

});

function saveResults(){
    let result = {
        name: playerName,
        time: ((endTime - startTime)/1000).toFixed(2),
    }
    
    results.push(result);

    results.sort((a,b) => parseFloat(a.time) - parseFloat(b.time));
    

    

    results.splice(10, 10);

    localStorage.setItem('score', JSON.stringify(results));

    $.post('server.php', {save: results}).done(function(){
        console.log("Success");
    }).fail(function(){
        alert("FAIL");
    }).always(function(){
        console.log("Tegime midagi AJAXiga");
    })

    showResults();

    
}

function showResults(){
    $('#results').html("");
    results.sort((a,b) => parseFloat(a.time) - parseFloat(b.time));
    for(let i = 0; i < results.length; i++){
        if(i === 10){break;}
        $('#results').append('<div class="' +i +'">' + (i+1) + '. ' + results[i].name + ' ' + results[i].time + '</div>');
    }
}




function restart(){
    createGrid(rows, cols);
    startTime = performance.now();
}

function gameOver(isWin){

    $('.col.mine').text("X").css('background-color', 'red');

    $('.col:not(.mine)').html(function(){
        const cell = $(this);
        const count = getMineCount(cell.data('row'), cell.data('col'));
        return count === 0 ? '': count;
    });

    $('.col.hidden').removeClass('hidden');
    
    if(isWin){
        setTimeout(function(){
            endTime = performance.now();
            $('#winScreen').show();
            $('#score').html("<div/><h3>Sinu aeg oli " + ((this.endTime - this.startTime)/1000).toFixed(2) + "</h3></div>");

            saveResults();
        }, 1000);
    }else{
        setTimeout(function(){
            $('#loseScreen').show();
        }, 1000);
    }




    
    
}

function reveal(io, jo){
    const seen = {};

    function helper(i, j){
        if(i >= rows || j >= cols || i<0 || j<0) return;
        const key = `${i} ${j}`
        if(seen[key]) return;
        const cell = $(`.col.hidden[data-row=${i}][data-col=${j}]`);
        const mineCount = getMineCount(i, j);
        if(!cell.hasClass('hidden') || cell.hasClass('mine')){
            return;
        }
        cell.removeClass('hidden');
        if(mineCount){
            cell.text(mineCount);
            return;
        }

        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                helper(i +x, j+y);
               
            }
        }

        return count;
    }

    helper(io,jo);
}

function getMineCount(i, j){
    let count =0;
    for(let x = -1; x <= 1; x++){
        for(let y = -1; y <= 1; y++){
            const newI = i + x;
            const newJ = j + y;
            if(newI >= rows || newJ >= cols || newJ < 0 || newI <0) continue;
            const cell = $(`.col.hidden[data-row=${newI}][data-col=${newJ}]`);
            if(cell.hasClass('mine')) count++;
                   
        }
    }
    return count;

}

grid.on('click', '.col.hidden', function(){
    const cell = $(this);
    const row = cell.data('row');
    const col = cell.data('col');
    //console.log(row, col);
    console.log($('.col.mine').length)
    console.log($('.col.hidden').length)
    if(cell.hasClass('mine')){
        gameOver(false);
    }else{
        reveal(row, col);
        const isGameOver = $('.col.hidden').length === $('.col.mine').length;
        if(isGameOver) gameOver(true);

    }
});
loadFromFile();
restart();

