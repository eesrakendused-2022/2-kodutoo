class Clicker{

    constructor(){
        this.name;
        this.mntdew = 0;
        this.pointerLv = 0;
        this.pointerPrice = 10;
        this.mntdewLv = 0;
        this.mntdewPrice = 10;
        this.mntdewClick = 1;
        this.mntdewSec = 0;
        this.x = 0;
        this.skinPrice = 2000;
        this.atmLv = 0;
        this.atmPrice = 100;
        this.mntdewFive = 0;

        this.results = [];

        this.nimi();
        this.clickCount();
        
        
        this.loadFromFile();

    }

    nimi(){
        $('#mntdew2').hide();
        $('#saveResult').hide();
        $('#showResult').hide();
        // $('#hideResult').hide();
        $('#submitName').click(()=>{this.name= $('#nameValue').val(); $('#name').hide(); $('#saveResult').show(); $('#showResult').show();})
    }

    clickCount(){
        $('.mntdewCounter').html("Swagness: " + this.mntdew);
        $('.mntdew').click(()=>{
            this.mntdew += this.mntdewClick;
            $('.mntdewCounter').html("Swagness: " + this.mntdew);
        });
        this.saveResults();
        
        this.pointer();
        this.booster();
        this.skin();
        this.atm();
    }

    pointer(){
        $(".pointer").click(()=>{
            if (this.mntdew >= this.pointerPrice) {
                this.mntdew -= this.pointerPrice;
                $(".mntdewCounter").text("Swagness: " + this.mntdew);
                this.pointerLv += 1;
                $(".pointerLv").text("Lv: " + this.pointerLv);
                this.pointerPrice = this.pointerPrice * 2;
                $(".pointerPrice").text("Price: " + this.pointerPrice);
                this.mntdewSec = this.pointerLv * 2;
                $(".pointerSec").text("Swagness/sec: " + this.mntdewSec);
            } else {
                alert('Not enough swagness man :(');
            }
        });
    }

    booster(){
        $(".lvlup").click(()=>{
            if (this.mntdew >= this.mntdewPrice) {
                this.mntdew -= this.mntdewPrice;
                $("#mntdewCounter").text("Swagness: " + this.mntdew);
                this.mntdewLv += 1;
                $(".mntdewLv").text("Lv: " + (this.mntdewLv + 1 ));
                this.mntdewPrice = this.mntdewPrice * 2;
                $(".mntdewPrice").text("Price: " + this.mntdewPrice);
                this.mntdewClick = this.mntdewLv * 2;
                $(".mntdewClick").text("Swagness/click: " + this.mntdewClick);
            } else {
                alert('Not enough swagness man :(');
            }
        });
        this.pog();
    }

    atm(){
        $(".atmBoost").click(()=>{
            if (this.mntdew >= this.atmPrice) {
                this.mntdew -= this.atmPrice;
                $("#mntdewCounter").text("Swagness: " + this.mntdew);
                this.atmLv += 1;
                $(".atmLvl").text("Lv: " + this.atmLv);
                this.atmPrice = this.atmPrice * 2;
                $(".atmPrice").text("Price: " + this.atmPrice);
                this.mntdewFive += 10;
                $(".fiveSec").text("Swagness/5sec: " + this.mntdewFive);
            } else {
                alert('Not enough swagness man :(');
            }
        });
        this.pog2();
    }

    pog(){
        setInterval(()=>{
            this.mntdew += this.mntdewSec;
        $("#mntdewCounter").text("Swagness: " + this.mntdew);
        }, 1000);
    }

    pog2(){
        setInterval(()=>{
            this.mntdew += this.mntdewFive;
        $("#mntdewCounter").text("Swagness: " + this.mntdew);
        }, 5000);
    }

   skin(){
        $(".skinBoost").click(()=>{
            if(this.mntdew >= this.skinPrice){
                this.mntdew -= this.skinPrice;
                $('#mntdew1').hide();
                $('#mntdew2').show();
                $('.skinStuff').hide();
                $('body').css({'color':'#FFC0CB'});
                alert('Nice skin man');
            } else {
                alert('Not enough swagness man :(');
            }
        });
    }

    loadFromFile(){
        $.get("andmed.txt", (data)=>{
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }


    saveResults(){
        $("#saveResult").click(()=>{
            let result = {
                name: this.name,
                clicks: this.mntdew,
                pointerLvl: this.pointerLv,
                boosterLvl: this.mntdewLv,
                ATMLvl: this.atmLv
            }

            this.results.push(result);
            this.sortResults();
            

            localStorage.setItem('score', JSON.stringify(this.results));

            $.post('server.php', {save: this.results}).done(function(){
                alert('Saving your work was a success');
            }).fail(function(){
                alert('FAIL');
            }).always(
                function(){
                    console.log('Tegime midagi AJAXiga');
                }
            )
        });
        this.showResults();     
    }

    sortResults(){
        this.results.sort((a, b) => parseInt(b.clicks) - parseInt(a.clicks));
    }

    showResults(){
        $('#showResult').click(()=>{
            for(let i = 0; i < this.results.length; i++){
                if(i === 10){break;}
                
                $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + this.results[i].name + '</div><div> ' + ' Swagness: ' + this.results[i].clicks + '</div><div> ' + ' Helping hand lvl: ' + this.results[i].pointerLvl + '</div><div> ' + ' Click boost lvl: ' + this.results[i].boosterLvl + '</div><div>' + ' ATM lvl: ' + this.results[i].ATMLvl + '</div><br>');
                // alert( (i+1) + '. Name: ' + this.results[i].name + ', Swagness: ' + this.results[i].clicks);
            }
            $('#showResult').hide();
            // $('#hideResult').show();
            
        });
        // this.hideResults();
    }

    /* hideResults(){
        $('#hideResult').click(()=>{
            $('#results').children("div").remove();
            $('#hideResult').hide();
            $('#showResult').show();
            
        });
        
    } */

}

let clicker = new Clicker();

