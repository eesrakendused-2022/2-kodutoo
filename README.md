Autor: Andres Sikka
On tehtud 2 klassi: App ja Move.
App klassis luuakse massiivi - 4x4;
"generateNum" - On App klassi meetod, kuhu saadetakse 4x4 massiivi ja mis genererib suvalises vabas kohas 2 või 4.
"printOnScreen" - On App klassi meetod, kuhu saadetakse 4x4 massiivi ja mis trükib väja massiivi ajax-i abil.
"highScoreBar" - On App klassi meetod, kuhu saadetakse 4x4 massiivi ja, mis lehe küljel näitab hetket saavutatud palle.
"moveLeft", "moveRight", "moveUp", "moveDown" - On Move klassi meetodid, kuhu saadetakse 4x4 massiivi ja meetodite põhimõte on liiguda massiive numbreid antud suunas.

Klasside väljaspool on initsieeritud klassid: App ja Move; Seal Jquery abil lisatakse mängu alguses kaks suvalist numbri. Järgmisena on tehtud "listener", mis jälgib nool-klahvide vajutamist. Igas juhtumis on kirjeldatud vastav eeskiri.

Seoses sellega, et ma hindasin oma koodi ja aja võimalusi üle, ma ei jaksanud implementeerida allajäämist mängus. Probleemid ka olid ajaxi HTTP ühendusega, mingil põhjusel php/või ajax ei tahtnud töötada.