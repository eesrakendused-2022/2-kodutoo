var num = 0;

window.onload = function () {
        var name = ("Player");
        
        var space = document.getElementById("space");
        
        space.innerHTML = name + "'s Cookie";
}

var cookie = document.getElementById("cookie");

function cookieClick() { 
    num += 1;

    var numbers = document.getElementById("numbers");
    
    //upgrade level for printing
    var upgradeLevel = document.getElementById("upgradeLevel");
    
    numbers.innerHTML = num;      
    //automatic Granny upgrade to 2x
    if(num >= 20 ){
        num += 1;
        upgradeLevel.innerHTML = "Granny Level";
    }

    //automatic factory upgrade to 10x
    if(num >= 100) {
        num += 8;
        upgradeLevel.innerHTML = "Tehas Level";
    }

    //automatic plant upgrade to 30x
    if(num >= 1000) {
        num += 20;
        upgradeLevel.innerHTML = "Ettevõtte Level";
    }

    //automatic super factory upgrade to 1000x
    if(num >= 10000) {
        num += 970;
        upgradeLevel.innerHTML = "Super-Ettevõtte Level";
    }
}
