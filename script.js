document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function fetchWeather(city) {
    const apiKey = '882039e5a3ba55c88fcacc6959d137aa'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherDisplay').innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod === 200) {
        const icon = getWeatherIcon(data.weather[0].main);
        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <div class="weather-icon">${icon}</div>
                <h2>${data.name}, ${data.sys.country}</h2>
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
                <p>${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    } else {
        weatherDisplay.innerHTML = `<p>City not found. Please try again.</p>`;
    }
}

function getWeatherIcon(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return '<i class="fas fa-sun"></i>';
        case 'clouds':
            return '<i class="fas fa-cloud"></i>';
        case 'rain':
            return '<i class="fas fa-cloud-rain"></i>';
        case 'snow':
            return '<i class="fas fa-snowflake"></i>';
        case 'thunderstorm':
            return '<i class="fas fa-bolt"></i>';
        default:
            return '<i class="fas fa-cloud-sun"></i>';
    }
}