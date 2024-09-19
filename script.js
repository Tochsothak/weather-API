// Api Key
const apiKey = "cdf45f214735de22b11b26f1b91574fe";

// Select DOM Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityNameElem = document.getElementById("cityName");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
// console.log(
//     cityInput,
//     getWeatherBtn,
//     cityNameElem,
//     descriptionElem,
//     descriptionElem
// );

// Add event listener to button
getWeatherBtn.addEventListener("click", () => {
    showLoading();
    const city = cityInput.value.trim();
    if (city.length === 0) {
        alert("City name cannot be empty.");
        return;
    }
    getWeatherData(city);
});

//Function get weather data from API
function getWeatherData(city) {
    const units = isCelsius ? "metric" : "imperial";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            hideLoading();
            displayWeatherData(data);
        })
        .catch((error) => {
            hideLoading();
            alert("Error fetching weather data.");
        });

    // Function Displa Weather data
    function displayWeatherData(data) {
        const { name } = data;
        const { temp } = data.main;
        const { description, icon } = data.weather[0];

        cityNameElem.textContent = `Weather in ${name}`;
        temperatureElem.textContent = `Temperature: ${temp}°C`;
        descriptionElem.textContent = `Conditions: ${description}`;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        document.getElementById("weatherIcon").src = iconUrl;
    }
}

// Loading Spinner function
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

// Switch to °F function
let isCelsius = true;

document.getElementById("unitToggle").addEventListener("click", () => {
    isCelsius = !isCelsius;
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
    document.getElementById("unitToggle").textContent = isCelsius ?
        "Switch to °F" :
        "Switch to °C";
});

// Geolocation
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longtitude } = position.coords;
    getWeatherByLocation(latitude, longtitude);
});

function getWeatherByLocation(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            getWeatherData(data);
        })
        .catch((error) => {
            alert("Error fetching weather data");
        });
}

// Dark Mode
const toggleDarkModeBtn = document.getElementById("darkModeToggle");
toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

//Five day forcast
function getFiveDayForecast(city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayForrcastData(data);
        })
        .catch((error) => {
            alert("Error fetching data.");
        });
}

function displayForrcastData(data) {}

//  Weather background
function setWeatherackground(description) {
    const images = document.getElementById("image");
    if (description.includes("rain")) {
        document.body.style.backgroundImage = url("images/rainy.jpg");
    } else if (description.includes("clear")) {
        document.body.style.backgroundImage = url("/images/sunny.jpg");
    } else if (description.includes("cloud")) {
        document.body.style.backgroundImage = url("/cloudy.jpg");
    }
}