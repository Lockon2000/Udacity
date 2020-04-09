const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const aylienTextAPI = require("aylien_textapi");

dotenv.config();

const app = express();

app.use(express.static('dist'));

const textapi = new aylienTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

console.log(`CWD: ${__dirname}`);


app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

app.get('/aylien', function (req, res) {
    textapi.extract({
        url: req.query.url,
        language: "en"
      }, function(error, response) {
        if (error === null) {
            textapi.sentiment({
                text: response.article,
                mode: 'docmuent',
                language: "en"
              }, function(error, response) {
                if (error === null) {
                    res.send(response);
                } else {
                    console.log(error);
                    res.status(500).send({
                        message: "Internal Server Error!"
                    })
                }
            });
        } else {
            console.log(error);
            res.status(500).send({
                message: "Internal Server Error!"
            })
        }
    });
});


// designates what port the app will listen to for incoming requests

const port = 5000;

app.listen(port, function () {
    console.log('"Evaluate News NLP" app listening on port 5000!')
});