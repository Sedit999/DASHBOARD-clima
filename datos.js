import { conversionGrafica } from "./conversion.js";

let clima;
let valorHumedad;
let valorViento;
let maximaTemp;
let minimaTemp;
let ciudad;
let temperatura;
let selctorDeClima;
let sensacionTermica;
let amanecerUnix;
let atardecerUnix;
let visivilidad;
let contadorViento = 0;

export function datosApi(latitud, longitud){ 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=7ced97c55afa67e9b4fb3828448b9007&units=metric`)
        .then(response => response.json())
        .then(data => {
        valorHumedad = data.main.humidity;
        valorViento = data.wind.speed;
        maximaTemp = data.main.temp_max;
        minimaTemp = data.main.temp_min;
        ciudad = data.name;
        temperatura = data.main.temp
        clima = data.weather.map ((e)=>{
            return e.main
        });
        sensacionTermica = data.main.feels_like;
        amanecerUnix = data.sys.sunrise;
        atardecerUnix = data.sys.sunset;
        visivilidad = (data.visibility)/1000;
        })
}

export function llenarDatos(){
    setTimeout(()=>{
        const humedad = document.getElementById('humedad')
        new Chart( humedad, {
            type: 'doughnut',
            data: {
                labels: ['Humedad'],
                datasets: [
                    {
                        label: 'Humedad',
                        data: [valorHumedad],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                        ],
                        borderColor: 'rgb(8, 17, 145)'
                    },
                
                ],
            
            },
        options: {
            circumference: conversionGrafica(valorHumedad)
        }
        }
        )
        if(valorViento === 0){valorViento += 1; contadorViento = 1} 
        const viento = document.getElementById('viento')
        new Chart( viento, {
            type: 'doughnut',
            data: {
                labels: ['Viento'],
                datasets: [
                    {
                        data: [valorViento],
                        backgroundColor: [
                            'rgb(201, 201, 201)',
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
                            'rgb(235, 187, 54)',
                            'rgb(218, 220, 70)',
                        ],
                        borderColor: 'rgb(197, 112, 14)'
                    },
                
                ],
            
            },
        options: {
            circumference: conversionGrafica(maximaTemp)
        }
        }
        )
        
        document.getElementById('porcentajeGrafico1').textContent = `${valorHumedad}%`;
        if(contadorViento === 1){valorViento = 0}
        document.getElementById('porcentajeGrafico2').textContent = `${valorViento} km/h`
        document.getElementById('porcentajeGrafico3').textContent = `max ${maximaTemp}°C / min ${minimaTemp}°C`
        document.getElementById('ciudad').textContent = `${ciudad}`
        document.getElementById('temperatura').textContent = `${temperatura}°C`
        document.getElementById('clima').textContent = `${clima}`
        let amanecer = new Date(amanecerUnix * 1000);
        let atardecer = new Date(atardecerUnix * 1000);
        let informacion =  `
            <ul>
                <li>Sensación térmica: ${sensacionTermica} °C</li>
                <li>Amanecer: ${amanecer.getHours()} : ${amanecer.getMinutes()} hrs</li>
                <li>Atardecer: ${atardecer.getHours()} : ${atardecer.getMinutes()} hrs</li>
                <li>Visivilidad: ${visivilidad} km</li>
            </ul>`;
        document.getElementById('informacionAdicional').innerHTML = informacion

    
        switch(clima[0]){
            case 'Thunderstorm' : selctorDeClima='electrica'
            break;
            case 'Drizzle' : selctorDeClima='lluvioso' 
            break;
            case 'Rain' : selctorDeClima='lluvioso'
            break;
            case 'Snow' : selctorDeClima='nevado' 
            break;
            case 'Clear' : selctorDeClima='soleado'
            break;
            case 'Clouds' : selctorDeClima='nublado'
            break;
            default : selctorDeClima='neblina'
            break;
        }
        document.querySelector('body').className=`${selctorDeClima}`
        document.getElementById('cargando').textContent = ''
        document.getElementById('header').innerHTML = `
            <img src="./img/LogoWhite.png" alt="logo">
        `
        
    },2000)
}
