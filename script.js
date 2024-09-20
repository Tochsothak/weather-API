// Api Key
const apiKey = "cdf45f214735de22b11b26f1b91574fe";

// Select DOM Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityNameElem = document.getElementById("cityName");
// 5-days forecast
const forecastContainer = document.getElementById("forecastContainer");
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
  //  5-days forecast
  getFiveDayForecast(city);
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

// 5-Days forecast
function getFiveDayForecast(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayFiveDayForecast(data);
    })
    .catch((error) => {
      alert("Error fetching weather data");
    });
}

// Function to display the 5-days forecast data
function displayFiveDayForecast(data) {
  forecastContainer.innerHTML = ""; //Clear the previous content

  // Extract forecast data for every 24 hours (8 intervals of 3 hours)
  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  dailyForecast.forEach((forecast) => {
    const date = new Date(forecast.dt_txt);
    const options = { weekday: "long", month: "short", day: "numeric" };
    const day = date.toLocaleDateString("en-US", options);
    const temperature = forecast.main.temp;
    const weatherDescription = forecast.weather[0].description;
    const icon = forecast.weather[0].icon;

    // Create forecast item
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    forecastItem.innerHTML = `
        <h3>${day}</h3>
        <img src='https://openweathermap.org/img/wn/${icon}.png' alt='Weather iocn'>
        <p>${Math.round(temperature)}&deg;C</p>
        <p>${weatherDescription}</p>`;
    // Append to forecast container
    forecastContainer.appendChild(forecastItem);
  });
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
  document.getElementById("unitToggle").textContent = isCelsius
    ? "Switch to °F"
    : "Switch to °C";
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
