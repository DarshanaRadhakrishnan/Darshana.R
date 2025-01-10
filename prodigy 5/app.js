const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const fetchWeatherData = (location) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('Location not found!');
                return;
            }

            // Display the weather information
            document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weather-condition').textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
};
const getLocationWeather = () => {
    const locationInput = document.getElementById('location').value.trim();

    if (locationInput) {
        fetchWeatherData(locationInput);
    } else {
        alert('Please enter a location!');
    }
};

document.getElementById('fetch-weather-btn').addEventListener('click', getLocationWeather);

// Optionally, use Geolocation API to get user's current location weather
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('weather-condition').textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}, error => {
console.error('Error fetching geolocation:', error);
});