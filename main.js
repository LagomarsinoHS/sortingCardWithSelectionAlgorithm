// Array con los numero de las cartas y sus colores
let cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let colors = ["spades", "clubs", "hearts", "diamonds"];

// Elementos del formulario para obtener el valor y los botones de dibujar y ordernar
let nrocartas = document.querySelector("#nrocartas");
let draw = document.querySelector("#draw");
let order = document.querySelector("#order");

// Variable donde se colocara las cartas generadas
let results = document.querySelector(".result");

// Variable donde se colocara las cartas ordenadas
let resultOrder = document.querySelector(".resultOrder");

// Variable para guardar las cartas generadas
let result_cartas = [];

const getValue = nro => {
    switch (nro) {
        case 1:  return "A";
        case 11: return "J";
        case 12: return "Q";
        case 13: return "K";
        default: return nro;
    }
}

const drawCardHTML = (nro, color) => {
    return `
        <div class="card">
            <div class="numero ${color}">
                ${getValue(nro)}
            </div>
        </div>
    `
}

const drawCardJS = (nro, color) => {
    // creamos el div para la carta
    let card = document.createElement("div");

    // creamos el div para el numero de la carta
    let numb = document.createElement("div");

    // anañadimos el estilo de la carta
    card.classList.add("card");

    // añadimos el estilo del contenido
    numb.classList.add("numero");
    numb.classList.add(color);

    // asignamos el valor del contenido
    numb.appendChild(document.createTextNode(getValue(nro)));

    // unimos el contenido a la carta
    card.appendChild(numb);

    // retornamos la carta completa
    return card;
}

const nroAleatorio = nro => {
    return Math.floor(Math.random() * nro);
}

const dibujarCartas = (arr, target) => {
    console.log(arr);
    console.log(target);
    /* let cartas = "";
    arr.forEach(carta => {
        let card = drawCardHTML(carta.nro, carta.color);
        cartas = cartas + card;
    });
    target.innerHTML = cartas; */

    arr.forEach(carta => {
        let card = drawCardJS(carta.nro, carta.color);
        target.appendChild(card);
    });
}

const dibujarCartasOrdenadas = (arr, target, index) => {
    let resultOrderRow = document.createElement("div");
    resultOrderRow.classList.add("resultOrderRow");
    let cartas = "";
    arr.forEach(carta => {
        let card = drawCardHTML(carta.nro, carta.color);
        cartas = cartas + card;
    });
    resultOrderRow.innerHTML = index + " " + cartas;
    target.appendChild(resultOrderRow);
}

const ordenarDibujarCartas = arr => {
    let wall = arr.length - 1;
    let j = 0;
    while(wall > 0){
        let index = 0;
        while(index < wall){
            if(arr[index].nro > arr[index + 1].nro){
                let aux = arr[index];
                arr[index] = arr[index + 1];
                arr[index + 1] = aux;
            }
            dibujarCartasOrdenadas(arr, resultOrder, j);
            index++;
            j++;
        }
        
        wall--;
    }
    return arr;
}



// Evento para generar las cartas segun la cantidad deseada del usuario
draw.addEventListener("click", (e) => {
    if (nrocartas.value === "") return alert("Debe Ingresar un valor");
    console.log("Iniciando Proceso de Dibujar las cartas");

    // Limpiamos el array de las cartas generadas anteriormente si estas existieran
    result_cartas = [];
    results.innerHTML = "";
    resultOrder.innerHTML = "";

    // Generamos el total de cartas deseadas por el usuario
    for (let index = 0; index < nrocartas.value; index++) {
        // Generando los indices aleatoriamente
        let nroCarta = nroAleatorio(cartas.length);
        let nroColor = nroAleatorio(colors.length);

        // Obteniendo los valores segun los numeros aleatorios generados
        let valorCarta = cartas[nroCarta];
        let valorColor = colors[nroColor];

        // Almacenamos en un objeto los valores generados
        result_cartas.push({ nro: valorCarta, color: valorColor });
    }

    /**
     * imprimiendo por consola para ver el 
     * resultado final de todos los objetos guardados 
     */
    //console.log(result_cartas);

    // Llamamos a la funcion encargada de colocar las cartas en el html
    dibujarCartas(result_cartas, results);

});

// Evento para ordenar el resultado de las cartas generadas
order.addEventListener("click", (e) => {
    console.log("Iniciando proceso de ordenamiento");
    ordenarDibujarCartas(Array.from(result_cartas));
});


/* let a = {
    name: "name"
}

let b = Object.assign({}, a);

b.name = "Humberto";

console.log(a);
console.log(b);

let arrA = [{
    name: "name"
}];

let arrB = arrA.slice(0);
console.log(arrB);

arrB[0].name = "Humberto";

console.log(arrA);
console.log(arrB); */