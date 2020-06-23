$btnComenzarReiniciar = document.querySelector('#btn-comenzar-reiniciar');
$btnComenzarReiniciar.addEventListener('click', comenzarOReiniciar);
let arregloConImagenes = ['green', 'yellow', 'orange', 'blue', 'black', 'white', 'brown', 'violet', 'grey', 'pink','green', 'yellow', 'orange', 'blue', 'black', 'white', 'brown', 'violet', 'grey', 'pink'];

function comenzarOReiniciar(){
    let cantidadIntentos = 0;
    let $todasLasTarjetas = document.querySelector('main').querySelectorAll('div');//nodeList
    console.log($todasLasTarjetas);
    arregloConImagenes = desordenarArreglo(arregloConImagenes);
    console.log(arregloConImagenes);
    darImagenALosElementos($todasLasTarjetas, arregloConImagenes);
    permitirClickearTarjetas($todasLasTarjetas, arregloConImagenes);
}

let darImagenALosElementos = (elementos, arregloConClases)=>{
    let i=0;
   elementos.forEach(elemento => {
       elemento.classList.add(arregloConClases[i]);
       i++;
   });
}

let darVueltaTarjeta = (elemento, claseElementoClickeado)=>{
    elemento.style.background = claseElementoClickeado;
}

function permitirClickearTarjetas($tarjetas){
    $tarjetas.forEach($tarjeta =>{
        $tarjeta.onclick = function(e){
            console.log(e.target);
            let elementoClickeado = e.target;
            let claseElementoClickeado = e.target.classList.value;
            darVueltaTarjeta(elementoClickeado, claseElementoClickeado);
        };
    });
}

function desordenarArreglo(arreglo){
    let aleatorio = 0;
    let auxiliar = 0;
    for(let i=0; i<arreglo.length; i++){
        aleatorio = Math.floor(Math.random() * arreglo.length);
        auxiliar = arreglo[aleatorio];

        arreglo.splice(aleatorio, 1);
        arreglo.push(auxiliar);
    }
    return arreglo;
}
