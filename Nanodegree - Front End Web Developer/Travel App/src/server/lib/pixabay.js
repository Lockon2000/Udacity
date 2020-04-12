import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

const APIKey = process.env.PIXABAY_APIKEY;
const baseURL = "https://pixabay.com/api";

async function getGuaranteedImageURL(directionData) {
    const [specificImageURL, countryImageURL] = await Promise.all([
        getImageURL(directionData.name),
        getImageURL(directionData.countryName)
    ]);

    if (specificImageURL !== null) {
        return specificImageURL;
    } else {
        return countryImageURL;
    }
}

async function getImageURL(place) {
    const URL = baseURL +
        `?key=${APIKey}` +
        `&q=${encodeURI(place)}` +
        `&image_type=photo` +
        `&category=travel` +
        `&min_width=500` +
        `&min_height=500`;

    const response = await fetch(URL);

    if (response.status >= 200 && response.status <= 399) {
        try {
            const data = await response.json();

            if (data.hits.length !== 0) {
                const imageData = data.hits[0];
                const imageURL = imageData.webformatURL;

                return imageURL;
            } else {
                return null;
            }
        } catch (err) {
            console.log("Error while converting response to JSON and processing resutls! (pixabay)");
            console.log(response);

            throw Error(err)
        }
    } else {
        console.log("The response status code is negative! (pixabay)");
        console.log(response);

        throw Error("Unsuccessful request! (pixabay)")
    }
}


export {
    getGuaranteedImageURL
};