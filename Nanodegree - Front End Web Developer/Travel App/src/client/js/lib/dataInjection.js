const tripDestinationSpans = document.querySelectorAll("#answers .trip-destination");
const tripDateSpan = document.querySelector("#trip-date");
const tripLengthSpan = document.querySelector("#trip-length");
const tripDistanceSpan = document.querySelector("#trip-distance");
const tripWeatherString = document.querySelector("#trip-weather-string");
const tripWeatherList = document.querySelector("#trip-weather-list");
const tripImage = document.querySelector("#answers .image-container img");

function injectData(data) {
    /* Inject the trip destination data */

    tripDestinationSpans.forEach((element) => {
        element.textContent = `${data.directionData.name}, ${data.directionData.countryName}`;
    });

    /* Inject the trip date date */

    tripDateSpan.textContent = data.startDate.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    /* Inject the trip length data */

    tripLengthSpan.textContent = data.tripLength;

    /* Inject the trip distance data */

    tripDistanceSpan.textContent = data.tripDistance;

    /* Inject the appropriate weather string */

    if (data.tripDistance > 0) {
        tripWeatherString.textContent = "Typical weather for then (forecast):";
    } else {
        tripWeatherString.textContent = "Weather info for today:";
    }

    /* Inject the weather details data */

    // Following procedure doesn't trigger a reflow at clearing or with every added list element
    //  because the container is hidden.
    tripWeatherList.innerHTML = "";

    const tripWeatherTemp = document.createElement("li");
    tripWeatherTemp.textContent = `Tempreture: ${data.weatherData.temp} °C`;
    const tripWeatherApparentTemp = document.createElement("li");
    tripWeatherApparentTemp.textContent = `Feeled tempreture: ${data.weatherData.apparentTemp} °C`;
    const tripWeatherWindSpeed = document.createElement("li");
    tripWeatherWindSpeed.textContent = `Wind speed: ${data.weatherData.windSpeed} m/s`;
    const tripWeatherUV = document.createElement("li");
    tripWeatherUV.textContent = `UV index: ${data.weatherData.uv}`;
    const tripWeatherDescription = document.createElement("li");
    tripWeatherDescription.textContent = `Description: ${data.weatherData.description}`;

    if (data.weatherData.temp) { tripWeatherList.appendChild(tripWeatherTemp); }
    if (data.weatherData.apparentTemp) { tripWeatherList.appendChild(tripWeatherApparentTemp); }
    if (data.weatherData.windSpeed) { tripWeatherList.appendChild(tripWeatherWindSpeed); }
    if (data.weatherData.uv) { tripWeatherList.appendChild(tripWeatherUV); }
    if (data.weatherData.description) { tripWeatherList.appendChild(tripWeatherDescription); }

    /* Inject the image */

    tripImage.setAttribute("src", data.imageURL);
}


export {
    injectData
};