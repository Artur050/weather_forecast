// загрузка страницы дождаться
document.addEventListener('DOMContentLoaded', ()=> {
    const apiKey = '9daf4b6a558f18f1ab42fc0b6013a742';
const form = document.querySelector('#form');
const input = document.querySelector('.search');
const temp = document.querySelector('.temp');
const name = document.querySelector('.city_name')
const weatherIcon = document.querySelector('.icon');
const container = document.querySelector('.container_infoCity');
const weatherContainer = document.querySelector('.weather_container')
let backgroundFullInfo = document.querySelector('#container_fullInformation');
let city;
let map;
const F = 273;

map = L.map('map').setView([51, 71], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


form.onsubmit = showWeather;

async function showWeather (event) {
    event.preventDefault();
    
    city = input.value.trim();
    input.value = '';
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Tem").innerHTML = Math.round(data.list[i].main.temp - F)+ "°";
        }
    
         for(i = 0; i<5; i++){
            weatherIcon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon +".png";
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +".png";
        }

    const temperature = data.list[0].main.temp;
    const description = data.list[0].weather[0].description;
    
    if(map) {
        map.off();
        map.remove();
    }

    map = L.map('map').setView([data.city.coord.lat, data.city.coord.lon], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    const marker = L.marker([data.city.coord.lat, data.city.coord.lon]).addTo(map);
    // marker.bindPopup(`<b>${city}</b><br>Температура (${temperature}C, ${description}`)

    temp.innerHTML = Math.round(temperature-F)+'&#176;';
    name.innerHTML = `${city}`;
    container.classList.add('container_infoCity-show');
    weatherContainer.classList.add('weather_container-show')

    switch(description) {
        case 'clear sky':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/clearsky.jpg')";
            break;
        case 'few clouds':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/fewclouds.jpg')";
            break;
        case 'scattered clouds':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/scatteredclouds.jpg')";
            break;
        case 'broken clouds':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/brokenclouds.jpg')";
            break;
        case 'shower rain':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/showerrain.jpg')";
            break;
        case 'rain':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/rain.jpg')";
            break;
        case 'thunderstorm':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/thunderstorm.jpg')";
            break;
        case 'snow':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/snow.jpg')";
            break;
        case 'light snow':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/lightsnow.jpg')";
            break;
        case 'mist':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/mist.jpg')";
            break;
        case 'light rain':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/lightrain.jpeg')";
            break;
        case 'overcast clouds':
            backgroundFullInfo.style.backgroundImage = "url('/jpg/overcastclouds.jpeg')";
            break;
        default:
            backgroundFullInfo.style.backgroundImage = "url('/jpg/lightrain.jpeg')";
    }  
    }).catch(err => alert(`У вас появилась ошибка: ${err}`))
}


const d = new Date();
const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}
})
