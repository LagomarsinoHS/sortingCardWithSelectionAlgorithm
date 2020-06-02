let numeroDeCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let pintaDeCartas = ["clubs", "diams", "hearts", "spades"];

let ingresoNumero = document.querySelector("input");
let draw = document.querySelector("#draw");
let sort = document.querySelector("#sort");
let todasLasCartas = [];


draw.addEventListener("click", () => {

    if (ingresoNumero.value <= 0 || ingresoNumero.value > 7) return document.querySelector("#error").innerHTML = "Favor elegir un numero entre 1~7, gracias!";

    document.querySelector("#error").style.display = "none";
    let lineaCartas = document.querySelector("#LineaCartas");
    let string = "";
    lineaCartas.innerHTML = "";
    todasLasCartas = [];

    for (i = 0; i < ingresoNumero.value; i++) {
        let pinta = random(pintaDeCartas);
        let numero = random(numeroDeCartas)
        let carta = `
        <div class="carta">
            <div class="numero ${pinta}">
                ${validador(numero)}
            </div>
        </div>`
        todasLasCartas.push({ numero, pinta })
        string += carta;
    }

    console.log("arriba", todasLasCartas);
    lineaCartas.innerHTML = string;

})


sort.addEventListener("click", () => {
    let ol = document.querySelector("#listaDeCartas");

    ol.innerHTML = "";

    function pintarCarta(arr) {
        let string = "";
        let nuevoLi = document.createElement("li");
        for (let i = 0; i < arr.length; i++) {
            let carta = `<div class="carta">
                        <div class="numero ${arr[i].pinta}">
                            ${validador(arr[i].numero)}
                        </div>
                    </div>`
            string += carta;
        }
        console.log(string);
        nuevoLi.innerHTML = string;
        ol.appendChild(nuevoLi);
    }




    function selectorSort(arr) {
        let min = 0;
        while (min < arr.length) {

            for (let i = min + 1; i < arr.length; i++) {
                if (arr[min].numero > arr[i].numero) {
                    let aux = arr[min];
                    arr[min] = arr[i];
                    arr[i] = aux;
                }
                pintarCarta(arr);
            }
            min++;
        }
    };
    selectorSort([...todasLasCartas]);
});


function random(num) {
    return num[Math.floor(Math.random() * num.length)];
}
function validador(num) {
    switch (num) {
        case 1: return "A";
        case 11: return "J";
        case 12: return "Q";
        case 13: return "K";
        default: return num;

    }
}

