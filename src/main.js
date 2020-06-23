$btnComenzarReiniciar = document.querySelector('#btn-comenzar-reiniciar');
$btnComenzarReiniciar.addEventListener('click', comenzarOReiniciar);
let arregloConImagenes = ['imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10','imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10'];

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
    //elemento.style.backgroundImage = 'url(img/imagen-01.jpg)'; si anda
    //elemento.style.backgroundImage = `/memotest-v1/img${claseElementoClickeado}.jpg`;//claseElementoClickeado;no anda
    elemento.style.backgroundImage = `url(img/${claseElementoClickeado}.jpg)`;
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
