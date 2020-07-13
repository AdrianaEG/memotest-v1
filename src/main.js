$(document).ready(function(){
    $('#myModal').modal('show');
})


const $btnComenzarReiniciar = document.querySelector('#btn-comenzar-reiniciar');
$btnComenzarReiniciar.addEventListener('click', comenzarOReiniciar);
const $btnSonido = document.querySelector('#contenedor-volumen');
$btnSonido.addEventListener('click', controlarSonido);
let arregloConImagenes = ['imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10','imagen-01', 'imagen-02', 'imagen-03', 'imagen-04', 'imagen-05', 'imagen-06', 'imagen-07', 'imagen-08', 'imagen-09', 'imagen-10'];
let cantidadIntentos = 0;
let exito = 0;
let funcionSegundos;
let contenedorTiempo = document.querySelector('#tiempo');
let segundos = 0;
let minutos = 0;

function controlarSonido(){
    if(document.querySelector('i').classList.value == 'fas fa-volume-up'){
        reproducirMusica();
    }
    else{
        detenerSonido();
    }
}

const reproducirMusica = () =>{
    document.querySelector('#audio').play();
    document.querySelector('#audio').loop = true;
    document.querySelector('i').classList.value = 'fas fa-volume-mute';
}

function detenerSonido(){
    document.querySelector('#audio').pause();
    document.querySelector('i').classList.value = 'fas fa-volume-up';
}

function comenzarOReiniciar(){
    reproducirMusica();
    segundos = 0;
    minutos = 0;
    detenerTiempo();
    comenzarTiempo();
    document.querySelector('#intentos').innerHTML = ' '
    exito = 0;
    cantidadIntentos = 0;
    document.querySelector('#btn-comenzar-reiniciar').innerHTML = 'Reiniciar';
    let $todasLasTarjetas = document.querySelector('main').querySelectorAll('div');//nodeList
    desbloquearTarjetas($todasLasTarjetas);
    limpiarTodasLasTarjetas($todasLasTarjetas);
    arregloConImagenes = desordenarArreglo(arregloConImagenes);
    darImagenALosElementos($todasLasTarjetas, arregloConImagenes);
    permitirClickearTarjetas($todasLasTarjetas, arregloConImagenes);
}

let desbloquearTarjetas = $tarjetas =>{
    $tarjetas.forEach($tarjeta =>{
        $tarjeta.style.pointerEvents = 'all';
    });
};

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
            darEfectoAlGirar(elementoClickeado);
            quitarEfecto(elementoClickeado);
            cantidadIntentos++;
            bloquearElementoClickeado(elementoClickeado);
            elementosClickeados.push(elementoClickeado);
            let claseElementoClickeado = e.target.classList.value;
            darVueltaTarjeta(elementoClickeado, claseElementoClickeado);
            //console.log('cantidad de clicks ' + clicks);
            clicks++;
            if(clicks == 2){
                document.querySelector('#intentos').innerHTML = cantidadIntentos/2;
                bloquearTarjetas($tarjetas);
                //console.log(hayCoincidencia(elementosClickeados));
                if(!hayCoincidencia(elementosClickeados)){
                    setTimeout(function(){
                        quitarImagen(elementosClickeados);
                        permitirClickearTarjetas($tarjetas);
                    }, 1000);
                }
                else{
                    bloquearTarjetasParaSiempre(elementosClickeados);
                    exito++;
                    setTimeout(()=>{
                        permitirClickearTarjetas($tarjetas)
                    },800);
                }
            }
            if(exito == 10){
                bloquearTarjetas($tarjetas);
                detenerSonido();
                detenerTiempo();
                avisarQueGano();
            }
        };
    });
}

function darEfectoAlGirar(tarjeta){
    tarjeta.style.transition = "all 0.7s ease";
    tarjeta.style.transform = "rotateY(360deg)";
}

function quitarEfecto(tarjeta){
    setTimeout(function () {
        tarjeta.style.transition = '';
        tarjeta.style.transform = '';
    }, 1000);
}


function avisarQueGano(){
    setTimeout(function(){
        $('#modalGanador').modal('show');
        document.querySelector('#tiempoGanador').innerHTML += document.querySelector('#tiempo').innerHTML;
        document.querySelector('#intentosGanador'). innerHTML += document.querySelector('#intentos').innerHTML;
    }, 500);    
}

function bloquearTarjetasParaSiempre(elementos){
    for(let i=0; i<elementos.length; i++){
        elementos[i].style.pointerEvents = 'none';
    }
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

function sumarSegundosMinutos(){
    if(segundos === 59){
        segundos = 0;
        minutos++;
        contenedorTiempo.innerHTML = minutos + 'min, ' + segundos + 'seg';
    }
    else{
        segundos++;
        if(minutos>0){
            contenedorTiempo.innerHTML = minutos + 'min, ' + segundos + 'seg';
        }
        else{
            contenedorTiempo.innerHTML = segundos + ' seg';
        }
    }
}

function comenzarTiempo(){
    funcionSegundos = setInterval(sumarSegundosMinutos, 1000);
}

function detenerTiempo(){
    clearInterval(funcionSegundos);
}
