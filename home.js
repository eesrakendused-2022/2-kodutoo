class Home{
    constructor(){
        this.clickercount = 0;
        this.totalcookies = 0;

        this.item1count = 0;
        this.item1cost = 30;

        this.item2count = 0;
        this.item2cost = 200;

        this.item3count = 0;
        this.item3cost = 3000;

        this.item4count = 0;
        this.item4cost = 10000;

        this.results = [];

        this.loadFromFile();
        this.buyItemShop();
        this.clicker();
    }

    clicker(){
        $('#money').html(this.clickercount);
        $('#clicker').click(()=>{
            this.clickercount += 1 + this.item1count;
            this.totalcookies += 1 + this.item1count;
            console.log(this.clickercount);
            $('#money').html(this.clickercount);
            this.shopUnlock();
        });
        this.saveResults();
        this.showResults();
    }

    shopUnlock(){
        if(this.clickercount >= this.item1cost){
            $('#item1btn').prop('disabled', false);
        } else {
            $('#item1btn').prop('disabled', true);
        }

        if(this.clickercount >= this.item2cost){
            $('#item2btn').prop('disabled', false);
        } else {
            $('#item2btn').prop('disabled', true);
        }

        if(this.clickercount >= this.item3cost){
            $('#item3btn').prop('disabled', false);
        } else {
            $('#item3btn').prop('disabled', true);
        }

        if(this.clickercount >= this.item4cost){
            $('#item4btn').prop('disabled', false);
        } else {
            $('#item4btn').prop('disabled', true);
        }
    }

    buyItemShop(){
        $('#item1btn').click(()=>{
            this.item1count++;
            this.clickercount -= this.item1cost;
            $('#money').html(this.clickercount);
            this.shopUnlock();
        });

        $('#item2btn').click(()=>{
            this.item2count++;
            this.clickercount -= this.item2cost;
            $('#money').html(this.clickercount);
            this.shopUnlock();
            this.item2Ability();
        });

        $('#item3btn').click(()=>{
            this.item3count++;
            this.clickercount -= this.item3cost;
            $('#money').html(this.clickercount);
            this.shopUnlock();
            this.item3Ability();
        });

        $('#item4btn').click(()=>{
            this.item4count++;
            this.clickercount -= this.item4cost;
            $('#money').html(this.clickercount);
            this.shopUnlock();
            this.item4Ability();
        });
    }

    item2Ability(){
        setInterval(()=>{
            this.clickercount += (20 * this.item2count);
            this.totalcookies += (20 * this.item2count);
            $('#money').html(this.clickercount);
        }, 1000);
    }

    item3Ability(){
        setInterval(()=>{
            this.clickercount += (1000 * this.item2count);
            this.totalcookies += (1000 * this.item2count);
            $('#money').html(this.clickercount);
        }, 5000);
    }

    item4Ability(){
        setInterval(()=>{
            this.clickercount += (5000 * this.item2count);
            this.totalcookies += (5000 * this.item2count);
            $('#money').html(this.clickercount);
        }, 10000);
    }

    loadFromFile(){
        $.get("andmed.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }

    saveResults(){
        $('#save').click(()=>{
            let result = {
                totalCookies: this.totalcookies,
                totalItems1: this.item1count,
                totalItems2: this.item2count,
                totalItems3: this.item3count,
                totalItems4: this.item4count
            }
    
            this.results.push(result);
    
            localStorage.setItem('score', JSON.stringify(this.results));
    
            $.post('server.php', {save: this.results}).done(function(){
                alert('Success');
            }).fail(function(){
                alert('FAIL');
            }).always(
                function(){
                    console.log('Tegime midagi AJAXiga');
                }
            )
        });
    }

    sortResults(){
        this.results.sort((a, b) => parseInt(b.totalCookies) - parseInt(a.totalCookies));
    }

    showResults(){
        $('#showsaved').click(()=>{
            this.sortResults();
            for(let i = 0; i < this.results.length; i++){
                if(i === 10){break;}
                alert((i+1) + '. Total cookies collected: ' + this.results[i].totalCookies + '; Total Robot hand bought: ' + this.results[i].totalItems1 + '; Total Jiga Chad helpers bought: ' + this.results[i].totalItems2 + '; Total Minecraft pvp players bought: ' + this.results[i].totalItems3 + '; Total Energy drink addicts bought: ' + this.results[i].totalItems4);
            }
        })
    }

}

let home = new Home();
