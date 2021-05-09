﻿var hotlist = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotlist[i] = {
            question: {},
            goodAnswears:0
        }
    }

    //Kezdő kérdéslista letöltése
    for (let i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }

    //Kérdések száma
    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })
    //Előre-hátra gomb
    document.getElementById("előre_gomb").addEventListener("click", előre);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    //mentett állapot read
    if (localStorage.getItem("hotlist")) {
        hotlist = JSON.parse(localStorage.getItem("hotlist"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = pareseInt(localStorage.getItem("displayedQuestion"));
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    //Kezdő letöltés
    if (hotlist.length === 0) {
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }

    }
    else {
        console.log("local storage in use");
        kérdésMegjelenítés();
    }

}



function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotlist[destination].question = q;
            hotlist[destination].goodAnswears = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került ${destination}. helyére`)
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })

}

function kérdésMegjelenítés() {
    let kérdés = hotlist[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó","rossz")
    }
    document.getElementById("válaszok").style.pointerEvents = "auto";
}
document.addEventListener("DOMContentLoaded", init)

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}
function vissza() {
    clearTimeout(timerHandler);
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}
function választás(n) {
    let kérdés = hotlist[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotlist[displayedQuestion].goodAnswears++;
        if (hotlist[displayedQuestion].goodAnswears===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotlist[displayedQuestion].goodAnswears = 0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";

    timerHandler = setTimeout(előre, 4000);

    localStorage.setItem("hotlist", JSON.stringify(hotlist));
    localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
    localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));

}