var hotList = [];
var DisplayedMárka;
var NumberofMárkas;
var NextMárka = 1;

function initM() {
    fetch("api/FHK6HB/count")
        .then(result => result.text())
        .then(n => { NumberofMárkas = parseInt(n) })

    for (var i = 0; i < NumberofMárkas; i++) {
        let t = {
            Márka: {},
        }
        hotList[i] = t;
    }

    for (var i = 0; i < NumberofMárkas; i++) {
        MárkaBetöltés(NextMárka, i);
        NextMárka++;
    }
}

function MárkaBetöltés(MárkaNumber, destination) {
    fetch(`/api/FHK6HB/${MárkaNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            t => {
                hotList[destination].id = t;
                console.log(`A ${MárkaNumber}. Márka letöltve a hot list ${destination}. helyére`)
                if (DisplayedMárka == undefined && destination == 0) {
                    DisplayedMárka = 0;
                    MárkaMegjelenites()
                }
            }
        );
}

function MárkaMegjelenites() {
    let márka = hotList[DisplayedMárka].id;

    if (!márka) return;
    console.log(márka);
    document.getElementById("szoveg").innerText = márka.manufacturer
}

vissza = function () {
    document.getElementById("szoveg").innerText = "";

    if (DisplayedMárka != 0) DisplayedMárka--;
    else DisplayedMárka = NumberofMárkas - 1;
    MárkaMegjelenites();
}

elore = function () {
    document.getElementById("szoveg").innerText = "";

    DisplayedMárka++;
    if (DisplayedMárka == NumberofMárkas) DisplayedMárka = 0;
    MárkaMegjelenites();
}

listazas = function () {
    initM();
    console.log("Márkák listázva!");
    document.getElementById("list").hidden = "true";
    document.getElementById("vissza_gomb").style.pointerEvents = "auto";
    document.getElementById("elore_gomb").style.pointerEvents = "auto";
}

window.onload = function () {
    console.log("Loaded");
    document.getElementById('addButton').addEventListener('click', () => {
        if (document.getElementById('Márka').value != "") {
            let data = {
                Márka: document.getElementById('Márka').value
            }

            fetch('api/FHK6HB',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            ).then(x => {
                if (x.ok) {
                    alert('Márka felvéve');
                    window.location.reload();
                }
                else {
                    alert('Nem sikerült felvenni új márkát');
                }
            });
        }
        else alert('A márka neve nem lehet üres');
    });
    document.getElementById("elore_gomb").onclick = elore;
    document.getElementById("vissza_gomb").onclick = vissza;
    document.getElementById("list").onclick = listazas;
    document.getElementById("vissza_gomb").style.pointerEvents = "none";
    document.getElementById("elore_gomb").style.pointerEvents = "none";
    initM();
}


