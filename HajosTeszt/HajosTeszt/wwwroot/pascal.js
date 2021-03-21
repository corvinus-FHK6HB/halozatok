window.onload = () => {
    console.log("start");
    var faktor = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        }

        else {
            return n * faktor(n - 1);
        }
    }
    for (var sor = 0; sor < 10; sor++) {
        var sordiv = document.createElement("div");
        sordiv.classList.add("sor")
        document.getElementById("pascal").appendChild(sordiv)

        for (var oszlop = 0; oszlop <= sor; oszlop++) {

            var elemdiv = document.createElement("div")
            sordiv.appendChild(elemdiv);
            elemdiv.classList.add("elem");
            elemdiv.innerText = faktor(sor) / (faktor(oszlop) * faktor(sor - oszlop));
            elemdiv.style.background = 'rgb(0, 0, ${(255*2/elemdiv.innerText)+125})';

        }
    }
}