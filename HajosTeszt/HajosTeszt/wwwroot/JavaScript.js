var hotlist = [];
var márkaszam = 0;

window.onload = () => {
    loadItems();
}

function loadItems() {
    fetch('/api/FHK6HB/count')
        .then(response => response.json())
        .then(
            itemsCount => {
                márkaszam = itemsCount;
                fetch('/api/FHK6HB/all')
                    .then(response => response.json())
                    .then(data => loadingFinished(data));
            }
        );
}

function loadingFinished(items) {
    console.log("Sikeres letöltés")
    console.log(items)
    hotlist = items;

    document.getElementById("subContainer").innerHTML = "";
    for (var i = 0; i < márkaszam; i++) {
        document.getElementById("subContainer").innerHTML += `<div class="márkák">
            <div class="lista">
                ${hotlist[i].manufacturer}
        </div>
            <div class="kattintható gomb">
                <div>
                    <i onclick="deleteItem(${hotlist[i].id})" class="material-icons">delete</i>
                </div>
            </div>
        </div>`;
    }
}
function addItem() {
    let data = {
        Manufacturer: document.getElementById('nev').value,
    }
    document.getElementById('nev').value = "";
    console.log(data);
    fetch("api/FHK6HB",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ).then(setTimeout(function () { loadItems(); }, 500));

}

function deleteItem(id) {

    fetch('api/FHK6HB/' + id, {
        method: 'DELETE',
    }).then(setTimeout(function () { loadItems(); }, 500));

}