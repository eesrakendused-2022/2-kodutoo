class Clicker {
    constructor() {
        this.clickScore = 0;
        this.novaCount = 0;
        this.cosmicCount = 0;
        this.celestialCount = 0;
        this.universeCount = 0;
        this.samsungCount = 0;
        this.neilCount = 0;
        this.results = [];
        
        this.loadFromFile();
        this.buyItem();
        this.countClicks();
        this.showResults();
    }

    loadFromFile(){
        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        }); 
    }

    countClicks() {
        $("#score").html(this.clickScore);

        $("#clicker").click(()=> {
            this.clickScore = this.clickScore + 1;
            $("#score").html(this.clickScore);
            console.log(this.clickScore);

            this.shopUnlocks();
        });
        this.saveResults();
        this.showResults();
    }

    shopUnlocks() {
        // shop items that unlock at specific clicks

        if (this.clickScore < 20 || this.novaCount == 4) {
            $("#buySupernova").prop('disabled', true);
        }  else {
            $("#buySupernova").prop('disabled', false);
        }

        if (this.clickScore < 100 || this.cosmicCount == 1) {
            $("#buyCosmic").prop('disabled', true);
        } else {
            $("#buyCosmic").prop('disabled', false);
        }

        if (this.clickScore < 200 || this.celestialCount == 3) {
            $("#buyCelestial").prop('disabled', true);
        } else {
            $("#buyCelestial").prop('disabled', false);
        }

        if (this.clickScore < 500 || this.universeCount == 1) {
            $("#buyUniverse").prop('disabled', true);
        } else {
            $("#buyUniverse").prop('disabled', false);
        }

        if (this.clickScore < 1000 || this.samsungCount == 3) {
            $("#buySamsung").prop('disabled', true);
        } else {
            $("#buySamsung").prop('disabled', false);
        }

        if (this.clickScore < 2500 || this.neilCount == 1) {
            $("#buyNeil").prop('disabled', true);
        } else {
            $("#buyNeil").prop('disabled', false);
        }
    }

    buyItem() { 
        $("#buySupernova").click(()=> {
            this.clickScore = this.clickScore - 20;
            console.log("minus 20");
            $("#score").html(this.clickScore);
            this.novaCount++;
            $("#novaCounter").html(this.novaCount);

            // adds extra clicks per click up to 4 times
            $("#clicker").click(()=> { this.clickScore = this.clickScore + 1; })

            this.shopUnlocks();
        });

        $("#buyCosmic").click(()=> {
            this.clickScore = this.clickScore - 100;
            console.log("minus 50");
            $("#score").html(this.clickScore);
            this.cosmicCount++;
            $("cosmicCounter").html(this.cosmicCount);

            // adds 10 clicks every 3 seconds
            this.startCosmic();

            this.shopUnlocks();
        });

        $("#buyCelestial").click(()=> {
            this.clickScore = this.clickScore - 200;
            console.log("minus 75");
            $("#score").html(this.clickScore);
            this.celestialCount++;
            $("celestialCounter").html(this.celestialCount);

            // adds 10 extra clicks per click up to 3 times
            $("#clicker").click(()=> { this.clickScore = this.clickScore + 10; })

            this.shopUnlocks();
        });

        $("#buyUniverse").click(()=> {
            this.clickScore = this.clickScore - 500;
            console.log("minus 100");
            $("#score").html(this.clickScore);
            this.universeCount++;
            $("universeCounter").html(this.universeCount);

            //adds 100 clicks every 5 seconds
            this.startUniverse();

            this.shopUnlocks();
        });

        $("#buySamsung").click(()=> {
            this.clickScore = this.clickScore - 1000;
            console.log("minus 150");
            $("#score").html(this.clickScore);
            this.samsungCount++;
            $("samsungCounter").html(this.samsungCount);

            // adds 50 extra clicks per click up to 3 times
            $("#clicker").click(()=> { this.clickScore = this.clickScore + 50; })

            this.shopUnlocks();
        });

        $("#buyNeil").click(()=> {
            this.clickScore = this.clickScore - 2500;
            console.log("minus 250");
            $("#score").html(this.clickScore);
            this.neilCount++;
            $("neilCounter").html(this.neilCount);

            //adds 1000 clicks every 10 seconds
            this.startNeil();

            this.shopUnlocks();
        });
    }

    startCosmic() {
        console.log("cosmic works");
        setInterval(()=> {
            this.clickScore += 10; $("#score").html(this.clickScore); console.log("added 10"); 
        }, 3000);
    }

    startUniverse() {
        console.log("universe works");
        setInterval(()=> {
            this.clickScore += 100; $("#score").html(this.clickScore); console.log("added 100"); 
        }, 5000);
    }

    startNeil() {
        console.log("neil works");
        setInterval(()=> {
            this.clickScore += 1000; $("#score").html(this.clickScore); console.log("added 1000"); 
        }, 8000);
    }

    saveResults(){
        $("#saveScore").click(()=> {
            let result = {
                score: this.clickScore
            }
            
            this.results.push(result);

            localStorage.setItem('score', JSON.stringify(this.results));

            $.post('server.php', {save: this.results}).done(function(){
                console.log('Success');
            }).fail(function(){
                alert('FAIL');
            }).always(
                function(){
                    console.log('Tegime midagi AJAXiga');
                }
            )
            this.showResults();
        })
    }

    sortResults(){
        this.results.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    }

    showResults(){
        this.sortResults();
        $("#highscore").html("");
        for(let i = 0; i < this.results.length; i++){
            if(i === 1){break;}
            $('#highscore').append(this.results[i].score);
        }
    }

}

let clicker = new Clicker();
