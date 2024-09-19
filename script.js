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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
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
        const { description } = data.weather[0];
        const { icon } = data.weather[0];

        cityNameElem.textContent = `Weather in ${name}`;
        temperatureElem.textContent = `Temperature: ${temp}°C`;
        descriptionElem.textContent = `Conditions: ${description}`;
    }
}

// Loading Spinner function
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}