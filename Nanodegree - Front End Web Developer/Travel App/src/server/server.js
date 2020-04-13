import path from 'path';

import dotenv from 'dotenv';
import express from 'express';

import { getGeoData } from './lib/geonames';
import { getWeatherData } from './lib/weatherbit';
import { getGuaranteedImageURL } from './lib/pixabay';


const app = express();
const distDir = __dirname;
const htmlFilePath = path.join(distDir, 'index.html');

dotenv.config();

app.use(express.static(distDir));

app.get('/', async (req, res, next) => {
    res.sendFile(htmlFilePath)
});

app.get("/api/process", async (req, res, next) => {
    try {
        const directionData = await getGeoData(req.query.direction);
        // Start the rest of the API calls synchronously as they don't depend on each other
        const [weatherData, imageURL] = await Promise.all([
            getWeatherData(directionData, req.query.tripDistance),
            getGuaranteedImageURL(directionData)
        ]);

        res.send({
            directionData,
            weatherData,
            imageURL
        });
    } catch (err) {
        console.log("Catched the error! Server continues operation ...");
        console.log(err);

        res.status(500).send({
            message: "Internal Server Error!"
        })
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening to ${port} ....`);
    console.log('Press Ctrl+C to quit.');
});