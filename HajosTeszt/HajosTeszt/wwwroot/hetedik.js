window.onload = () => {
    letöltés();
    kérdésmegjelenítés
}
var kérdések;
var kérdéssorszám = 0;
function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésShow(0);

}
var kérdésmegjelenítés = function (kérdészáma) {
    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdések[kérdészáma].questionText
    kép.src = "" + kérdések[kérdészáma].image
    válasz1.innerText = kérdések[kérdészáma].answear1
    válasz2.innerText = kérdések[kérdészáma].answear2
    válasz3.innerText = kérdések[kérdészáma].answear3
}
function vissza() {
    if (kérdéssorszám == 0) {
        kérdészáma = kérdések.length - 1;
        letöltés();
    }
    else {
        kérdészáma--;
        letöltés();
    }
}
function elore() {
    if (kérdéssorszám == kérdések.length - 1) {
        kérdészáma = 0;
        letöltés();
    }
    else {
        kérdészáma++;
        letöltés();
    }
}
