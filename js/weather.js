//WEATHER
const URL = "https://api.openweathermap.org/data/2.5/weather";

const btnSearch = document.querySelector('.btnSearch');
const inputSearch = document.getElementById('city');

const ciudad = document.querySelector('.ciudad');
const pais = document.querySelector('.pais');
let temperaturaMinimo = document.querySelector('.temperaturaMinimo');
let temperaturaMaxima = document.querySelector('.temperaturaMaxima');
let temperaturaActual = document.querySelector('.temperaturaActual');
let pValorPresionAtmosferica = document.querySelector('.pValorPresionAtmosferica');
let pValorHumedad = document.querySelector('.pValorHumedad');
let pValorSensacionTermica = document.querySelector('.pValorSensacionTermica');
let pValorVelocidadDeViento = document.querySelector('.pValorVelocidadDeViento');
let videoClima = document.querySelector('.video');

btnSearch.addEventListener('click', () => {
    buscarEnLaApi(inputSearch.value);
});

function buscarEnLaApi (searchValue) {

    fetch(`${URL}?q=${searchValue}&appid=${API_KEY}&lang=es`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log('Imprimo JSON:', data);
        recorrerValores(data);
        videosClima(data);
        guardarResultados(data);
    })
    .catch(error => {
        console.log('Error:', error);
    });
} 


function recorrerValores (data) {
    ciudad.innerHTML = data.name;
    pais.innerHTML = data.sys.country;
    temperaturaActual.innerHTML = `${celsius(data.main.temp)} °C`;
    temperaturaMinimo.innerHTML = `${celsius(data.main.temp_min)} °C`;
    temperaturaMaxima.innerHTML = `${celsius(data.main.temp_max)} °C`;
    pValorPresionAtmosferica.innerHTML = `${data.main.pressure} mb`;
    pValorHumedad.innerHTML = `${data.main.humidity} %`;
    pValorSensacionTermica.innerHTML = `${celsius(data.main.feels_like)} °C`;
    pValorVelocidadDeViento.innerHTML = `${data.wind.speed} km/h`;
}

function celsius (kelvin) {
    return Math.round(kelvin - 273.15);
}

function videosClima (data) {
    switch (data.weather[0].main) {
        case 'Thunderstorm':
            videoClima.src = 'rain.mp4';
          break;
        case 'Drizzle':
            videoClima.src = 'rain.mp4';
          break;
        case 'Rain':
            videoClima.src = 'rain.mp4';
          break;
        case 'Snow':
            videoClima.src = 'snow.mp4';
          break;                        
        case 'Clear':
            videoClima.src = 'sun.mp4';
          break; 
        case 'Clouds':
            videoClima.src = 'cloudy.mp4';
            break;  
        default:
            videoClima.src = 'mundo.mp4';
      }
   
}

function guardarResultados (data) {
    localStorage.setItem('weather', JSON.stringify(data));
}



