## Capture-the-king

# Mis see on?
1. Capture the king on agressiivsem ja intensiivsem variant klassikalisest lauamängust "male".
2. Mängu eesmärk ei ole saavutada vastasele Šahh-matt, vaid selles versioonis on kuningas samuti söödav nupp.
3. Mängu võidad süües vastase kuninga.

# Kuidas mängida?
1. Nagu klassikalises males, on siin täpselt samasugused liikumised nuppudel.
2. Vajuta nupule, selle peale avaneb sulle võimalikud käigud ja liigu vastavale ruudule
3. *Note* vastase nuppu süües vajuta vastavale ruudule, mitte vastase nupule endile, kuna seda mängid tavaliselt 2 in ühe arvuti taga

# Funktsioonid, klassid ja tehniline pool
1. Mäng on loodud kasutades nii vanilla JavaScripti kui ka (enamjaolt) JQuery-t
2. Mängides näed sa reaalajas palju nuppe oled sa vastaselt võtnud
3. Võidu/kaotuse korral kuvatakse ka scoreboard, kuhu kuvatakse 3 viimast mängu (töötab ainult greeny versioonil, kuna lin2 omal pole php supporti)
4. Mängu skoorid saadetakse tekstifaili db.txt kasutades AJAX-i põhimõtteid
5. Lehel kuvatakse ka see, kelle kord on käia (juhul, kui meelest läks vms)
6. Kasutusel on 3 klassi ja 1 funktsionaalne js fail. Klassid 1 ja 2 vastutavad liikumise/söömise/highlighti loogika eest. Klass 3 tegeleb puhtalt ainult AJAX-ga. Func js fail vastutab mängu üldise loogika eest, ehk kes millal käib, millal viiakse AJAX klassi info ja saadetakse andmebaasi, millal kuvatakse võit jne. 

Mängu saab proovida siin: 
http://www.tlu.ee/~krisplv/jQueryGame/
või siin (vajalik greeny tunnel):
http://greeny.cs.tlu.ee/~kripol/frontend/jQueryGame/

# Pildid mängust

Pilt coverist, mis on välja toodud mängu nimi, väike sissejuhatus ja võimalus sisestada mängijate nimed
![lahe pilt](jQueryGame/front.png)

Pilt mängust endast.
![lahe pilt](jQueryGame/mainGame.png)

Pilt lipu liikumisest laual
![lahe pilt](jQueryGame/queenMovement.png)

Pilt, kus valge võitis.
![lahe pilt](jQueryGame/whiteWin.png)

Pilt autori nimest ja lingist gitHub reposse(click on logo)
![lahe pilt](jQueryGame/Screenshot_1.png)
