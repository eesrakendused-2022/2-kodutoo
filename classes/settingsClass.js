class settingsClass {
    divElement;
    textElement;
    checkboxElement;
    rangeElement;
    counterElement;

    playername = "Anonymous";
    speedMultiplier = 2;
    isHardmode = false;
    framesPerSecond = 60;

    divElementShowing;

    constructor(divSelector, textSelector, checkboxSelector, rangeSelector, counterSelector) {
        this.divElement = $(divSelector);

        this.textElement = $(textSelector);
        this.textElement.val(this.playername);
        
        this.checkboxElement = $(checkboxSelector);
        this.checkboxElement.prop("checked", this.isHardmode);

        this.rangeElement = $(rangeSelector);
        this.rangeElement.val(60);
        
        this.counterElement = $(counterSelector);
        this.counterElement.text(this.framesPerSecond);
        
        this.divElement.hide();
        this.divElementShowing = false;

        this.textElement.on("input", () => {
            this.playername = this.textElement.val();
            console.log(this.playername);
        });

        this.checkboxElement.on("click", () => {
            this.isHardmode = !this.isHardmode;
            this.checkboxElement.prop("checked", this.isHardmode);
            if(this.isHardmode) {
                this.speedMultiplier = 1.2; //quicker
                return;
            }
            this.speedMultiplier = 2;   //slower
        });

        this.rangeElement.on("input", () => {
            this.framesPerSecond = this.rangeElement.val()
            this.counterElement.text(this.framesPerSecond);
        });
    }

    hideDiv() {
        this.divElementShowing = false;
        this.divElement.fadeOut(200);
    }

    showDiv() {
        this.divElementShowing = true;
        this.divElement.fadeIn(200);
    }
}