let valorHumedad;
let valorViento;
let maximaTemp;
let minimaTemp;
let ciudad;
let temperatura;
let clima;
let lat;
let lon;
let selctorDeClima;



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
        maximumAge: 0,
        timeout: 10000
    }

    navigator.geolocation.getCurrentPosition(ubicacionConcedida, errUbicacion, configSolicitud)
}

    
   
   
setTimeout( () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ced97c55afa67e9b4fb3828448b9007&units=metric`)
        .then(response => response.json())
        .then(data => {
        valorHumedad = data.main.humidity
        valorViento = data.wind.speed
        maximaTemp = data.main.temp_max
        minimaTemp = data.main.temp_min
        ciudad = data.name
        temperatura = data.main.temp
        clima = data.weather.map ((e)=>{
            return e.main
        })
        
        })
    },3000)


setTimeout(()=>{
    const humedad = document.getElementById('humedad')
    new Chart( humedad, {
        type: 'doughnut',
        data: {
            labels: ['humedad'],
            datasets: [
                {
                    label: 'Humedad',
                    data: [valorHumedad],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                    ],
                },
            
            ],
        
        },
    options: {
        circumference: conversionGrafica(valorHumedad)
    }
    }
    )

    const viento = document.getElementById('viento')
    new Chart( viento, {
        type: 'doughnut',
        data: {
            labels: ['Viento'],
            datasets: [
                {
                    data: [valorViento],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                    ],
                },
            
            ],
        
        },
    options: {
        circumference: conversionGrafica(valorViento)
    }
    }
    )

    const maxTemp = document.getElementById('maxTemp')
    new Chart( maxTemp, {
        type: 'doughnut',
        data: {
            labels: ['maxTemp'],
            datasets: [
                {
                    label: 'max Temp, min Temp',
                    data: [maximaTemp, minimaTemp],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(70, 150, 220)',
                    ],
                },
            
            ],
        
        },
    options: {
        circumference: conversionGrafica(maximaTemp)
    }
    }
    )
    
    
    document.getElementById('porcentajeGrafico1').textContent = `${valorHumedad}%`
    document.getElementById('porcentajeGrafico2').textContent = `${valorViento} km/h`
    document.getElementById('porcentajeGrafico3').textContent = `max ${maximaTemp}°C / min ${minimaTemp}°C`
    document.getElementById('ciudad').textContent = `${ciudad}`
    document.getElementById('temperatura').textContent = `${temperatura}°C`
    document.getElementById('clima').textContent = `${clima}`
   
    if (clima[0] === 'Thunderstorm'){selctorDeClima='electrica'}
    if (clima[0] === 'Drizzle'){selctorDeClima='lluvioso'}
    if (clima[0] === 'Rain'){selctorDeClima='lluvioso'}
    if (clima[0] === 'Snow'){selctorDeClima='nevado'}
    if (clima[0] === 'Clear'){selctorDeClima='soleado'}
    if (clima[0] === 'Clouds'){selctorDeClima='nublado'}
    else{selctorDeClima='neblina'}
    console.log(selctorDeClima)
    document.querySelector('body').className=`${selctorDeClima}`
},5000)


function conversionGrafica(valor){
    return (valor*360)/100
}


document.addEventListener("DOMContentLoaded", funcionInicial);