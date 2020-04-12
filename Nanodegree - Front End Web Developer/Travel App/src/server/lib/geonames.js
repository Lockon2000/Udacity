import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const APIusername = process.env.GEONAMES_USERNAME;
const baseURL = "http://api.geonames.org/searchJSON";

async function getGeoData(direction) {
    const URL = baseURL +
        `?username=${APIusername}` +
        `&q=${encodeURI(direction)}` +
        `&maxRows=1`;

    const response = await fetch(URL);

    if (response.status >= 200 && response.status <= 399) {
        try {
            const data = await response.json();
            const directionData = data.geonames[0];
            const lng = directionData.lng;
            const lat = directionData.lat;
            const name = directionData.name;
            const countryName = directionData.countryName;
            const countryCode = directionData.countryCode;

            return {
                lng,
                lat,
                name,
                countryName,
                countryCode
            };
        } catch (err) {
            console.log("Error while converting response to JSON and processing resutls! (Geonames)");
            console.log(response);

            throw Error(err)
        }
    } else {
        console.log("The response status code is negative! (Geonames)");
        console.log(response);

        throw Error("Unsuccessful request! (Geonames)")
    }
}


export {
    getGeoData
};