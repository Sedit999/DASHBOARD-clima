import {datosApi, llenarDatos} from "./datos.js"

let lat;
let lon;

const funcionInicial = () => {
    if(!"geolocation" in navigator){
        return alert ("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
    }
    
    const ubicacionConcedida = ubicacion => {
        lat = ubicacion.coords.latitude;
        lon = ubicacion.coords.longitude;
    }

    const errUbicacion = err => {
        alert('Error al obtener ubicacion: '+err.message)
    }

    const configSolicitud = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }

    navigator.geolocation.getCurrentPosition(ubicacionConcedida, errUbicacion, configSolicitud)
    
}

setTimeout( () => {
    datosApi(lat, lon);
},5100)

setTimeout ( () => {
    llenarDatos();
},7100)


setTimeout(()=>{
   clima == undefined ? window.location.reload() : console.log('todo bien')
}, 12000)

document.addEventListener("DOMContentLoaded", funcionInicial);