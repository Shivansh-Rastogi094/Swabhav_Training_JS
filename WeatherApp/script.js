const weatherForm = document.querySelector(".Weather");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "5a8f2650619b9f1bbbebf4ca84c11aec";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        } catch (error) {
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather");
    }

    return await response.json();
}

function displayWeather(data) {

    const {
        name,
        main: { temp, humidity },
        weather
    } = data;

    card.style.display = "flex";
    card.innerHTML = "";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = name;
    cityDisplay.classList.add("city-display");

    tempDisplay.textContent = `${Math.round(temp)}°C`;
    tempDisplay.classList.add("temp-display");

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity-display");

    descDisplay.textContent = weather[0].description;
    descDisplay.classList.add("desc-display");

    emojiDisplay.textContent = getWeatherEmoji(weather[0].id);
    emojiDisplay.classList.add("emoji-display");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherId) {

    switch (true) {

        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 500):
            return "🌦️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case (weatherId >= 600 && weatherId < 700):
            return "❄️";

        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case (weatherId === 800):
            return "☀️";

        case (weatherId > 800):
            return "☁️";

        default:
            return "❓";
    }
}

function displayError(message) {

    card.style.display = "flex";
    card.innerHTML = "";

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.appendChild(errorDisplay);
}