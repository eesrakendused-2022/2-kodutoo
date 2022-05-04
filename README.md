# Mäng: Laevade pommitamine (battleship)

## Autori nimi: Christian- Enrique Hindremäe

* Tegemist on laevade pommitamise mängu lihtsustatud variandiga. Mängulaual on kaks tabelit, vastase ja mängija oma.
* Tabelite all paikneb infoväli, kus kuvatakse mängu staatust, käikude arvu, ning allesolevate laevade arvu.
* Mängu käik:

1. Paiguta oma laevad, klikkides oma tabelis olevatele soovitud lahtritele
1. Peale laevade paigutamist mäng algab esimese käiguga. Kliki vastase tabelis lahtrile, mida soovid pommitada.
1. Kui sinul või vastasel saavad laevad otsa, on mäng läbi. Tulemus kuvatakse infoväljas.

![image](https://user-images.githubusercontent.com/90316663/166651462-b2a8d1be-d070-4c6d-a0da-274558d9bb9f.png)
![image](https://user-images.githubusercontent.com/90316663/166651537-d5e508d5-20fd-4dcd-9e48-259cc5e89c3d.png)

## Funktsionaalsus:

1. Enna alustamist küsitakse promptiga mängija nime.
2. Mängu alguses on tühjad mängutabelid. Lisaks on olemas juhiste väli lehe ülaosas (details element).
3. Mängu seisund muutub vastavalt olukorrale. Esialgne olukord on "preparation", mille käigus saab mängija paigutada oma laevad. 
4. Kui laevad on paigutatud, muutub seis "battle"'iks, mille jooksul saab pommitada vastase laevu.
5. Kui vastase laevad on kõik mahapommitatud, saab mängu seisuks "playerWin" ehk mängija võitis, vastupidisel juhul "opponentWins".
6. Mängu jooksul peetakse arvestust käikude arvu üle.
7. Mängu lõppedes salvestatakse tulemus, mis sisaldab nime, käikude arvu ja võitjat.
8. Tulemuste loend on sorteeritud käikude arvu järgi kasvavas järjekorras.
