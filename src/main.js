$btnComenzarReiniciar = document.querySelector('#btn-comenzar-reiniciar');
$btnComenzarReiniciar.addEventListener('click', comenzarOReiniciar);
let arregloConImagenes = ['imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10','imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10'];
let cantidadIntentos = 0;
let exito = 0;

function comenzarOReiniciar(){
    document.querySelector('#btn-comenzar-reiniciar').innerHTML = 'Reiniciar';
    let $todasLasTarjetas = document.querySelector('main').querySelectorAll('div');//nodeList
    limpiarTodasLasTarjetas($todasLasTarjetas);
    arregloConImagenes = desordenarArreglo(arregloConImagenes);
    darImagenALosElementos($todasLasTarjetas, arregloConImagenes);
    permitirClickearTarjetas($todasLasTarjetas, arregloConImagenes);
}

let limpiarTodasLasTarjetas = $tarjetas =>{
    $tarjetas.forEach($tarjeta =>{
        $tarjeta.classList = '';
        $tarjeta.style.backgroundImage = '';
    });
}

let darImagenALosElementos = (elementos, arregloConClases)=>{
    let i=0;
   elementos.forEach(elemento => {
       elemento.classList.add(arregloConClases[i]);
       i++;
   });
}

let darVueltaTarjeta = (elemento, claseElementoClickeado)=>{
    elemento.style.backgroundImage = `url(img/${claseElementoClickeado}.jpg)`;
}

function permitirClickearTarjetas($tarjetas){
    let clicks = 0;
    let elementosClickeados = [];
    $tarjetas.forEach($tarjeta =>{
        $tarjeta.onclick = function(e){
            let elementoClickeado = e.target;
            cantidadIntentos++;
            bloquearElementoClickeado(elementoClickeado);
            elementosClickeados.push(elementoClickeado);
            let claseElementoClickeado = e.target.classList.value;
            darVueltaTarjeta(elementoClickeado, claseElementoClickeado);
            console.log('cantidad de clicks ' + clicks);
            clicks++;
            if(clicks == 2){
                bloquearTarjetas($tarjetas);
                console.log(hayCoincidencia(elementosClickeados));
                if(!hayCoincidencia(elementosClickeados)){
                    setTimeout(function(){
                        quitarImagen(elementosClickeados);
                        permitirClickearTarjetas($tarjetas);
                    }, 600)
                }
                else{
                    exito++;
                    setTimeout(()=>{
                        permitirClickearTarjetas($tarjetas)
                    },600);
                }
            }
            console.log(`los aciertos: ${exito}`);
            console.log(`la cantidad de intentos que lleva ${cantidadIntentos/2}`);
        };
    });
}

function bloquearElementoClickeado(elemento){
    elemento.onclick = function(){

    }
}

function bloquearTarjetas($tarjetas){
    $tarjetas.forEach($tarjeta=>{
        $tarjeta.onclick = function(){

        }
    })
}

function quitarImagen(elementos){
    for(let i=0; i<elementos.length; i++){
        elementos[i].style.backgroundImage = '';
        //elementos[i].classList = '';
    }
}

function hayCoincidencia(elementos){
    return elementos[0].classList[0] == elementos[1].classList[0];
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
