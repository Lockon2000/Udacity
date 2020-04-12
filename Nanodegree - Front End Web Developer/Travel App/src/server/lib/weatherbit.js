import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const APIKey = process.env.WEATHERBIT_APIKEY;
const baseCurrentWeatherURL = "https://api.weatherbit.io/v2.0/current";
const baseForecastWeatherURL = "https://api.weatherbit.io/v2.0/forecast/daily";

async function getWeatherData(directionData, tripDistance) {
    const isCurrent = (tripDistance == 0);
    const URL = (isCurrent ? baseCurrentWeatherURL : baseForecastWeatherURL) +
        `?key=${APIKey}` +
        `&lat=${directionData.lat}` +
        `&lon=${directionData.lng}`;

    const response = await fetch(URL);

    if (response.status >= 200 && response.status <= 399) {
        try {
            const data = await response.json();
            const weatherData = data.data[0];
            const temp = weatherData.temp;
            const apparentTemp = weatherData.app_temp;
            const uv = weatherData.uv;
            const windSpeed = weatherData.wind_spd;
            const description = weatherData.weather.description;

            return {
                temp,
                apparentTemp,
                uv,
                windSpeed,
                description
            };
        } catch (err) {
            console.log("Error while converting response to JSON and processing resutls! (Weatherbit)");
            console.log(response);

            throw Error(err)
        }
    } else {
        console.log("The response status code is negative! (Weatherbit)");
        console.log(response);

        throw Error("Unsuccessful request! (Weatherbit)")
    }
}


export {
    getWeatherData
};