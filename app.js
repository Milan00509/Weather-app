const apiKey = 'a9086752d9868e070a6335a801244a81';

document.getElementById('toggle-mode').addEventListener('click', toggleMode);
document.getElementById('city-input').addEventListener('input', fetchSuggestions);
document.getElementById('geo-location').addEventListener('click', getCurrentLocation);
document.getElementById('add-favorite').addEventListener('click', addToFavorites);

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

async function fetchSuggestions(event) {
    const query = event.target.value;
    if (query.length > 2) {
    
    }
}

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    updateWeatherInfo(data);
}

function updateWeatherInfo(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            updateWeatherInfo(data);
        });
    }
}

function addToFavorites() {
    const city = document.getElementById('city-name').textContent;
    if (city !== 'City Name') {
        const favorites = document.getElementById('favorites');
        const cityElement = document.createElement('div');
        cityElement.textContent = city;
        favorites.appendChild(cityElement);
    }
}
