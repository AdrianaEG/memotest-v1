$btnComenzarReiniciar = document.querySelector('#btn-comenzar-reiniciar');
$btnComenzarReiniciar.addEventListener('click', comenzarOReiniciar);
function comenzarOReiniciar(){
    let cantidadIntentos = 0;
    obtenerAleatorio();
    permitirClickearTarjetas();
}

function permitirClickearTarjetas(){
    let $todasLasTarjetas = document.querySelector('main').children;//Object
    console.log($todasLasTarjetas.length);
    for(let i=0; i<$todasLasTarjetas.length; i++){
        $todasLasTarjetas[i].onclick = function(){

        }
    }
}

function obtenerAleatorio(){
    
}