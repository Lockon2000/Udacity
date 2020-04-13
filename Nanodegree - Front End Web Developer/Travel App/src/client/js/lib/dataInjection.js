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

    tripWeatherString.textContent = (data.tripDistance > 0) ?
        'Typical weather for then (forecast):' :
        'Weather info for today:';

    /* Inject the weather details data */

    // Following procedure doesn't trigger a reflow at clearing or with every added list element
    //  because the container is hidden.
    tripWeatherList.innerHTML = "";

    if (data.weatherData.temp) {
        tripWeatherList.innerHTML += `<li>Tempreture: ${data.weatherData.temp} °C</li>`;
    }
    if (data.weatherData.apparentTemp) {
        tripWeatherList.innerHTML += `<li>Feeled tempreture: ${data.weatherData.apparentTemp} °C</li>`;
    }
    if (data.weatherData.windSpeed) {
        tripWeatherList.innerHTML += `<li>Wind speed: ${data.weatherData.windSpeed} m/s</li>`;
    }
    if (data.weatherData.uv) {
        tripWeatherList.innerHTML += `<li>UV index: ${data.weatherData.uv}</li>`;
    }
    if (data.weatherData.description) {
        tripWeatherList.innerHTML += `<li>Description: ${data.weatherData.description}</li>`;
    }

    /* Inject the image */

    tripImage.setAttribute("src", data.imageURL);
}


export {
    injectData
};