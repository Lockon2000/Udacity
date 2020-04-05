/* Global Variables */

baseURL = "api.openweathermap.org/data/2.5/weather";
APIKey = "807c570b12e30da6ef5869181eb015e7";
// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


async function getWeather(zipCode) {
    const response = await fetch(`http://${baseURL}?zip=${zipCode},de&appid=${APIKey}`);
    
    try {
        let data = await response.json();
        return data;
    } catch(err) {
        throw err;
    }
}

function generateCallBack() {
    const zipCode = document.querySelector("#zip").value;
    const userResponse = document.querySelector("#feelings").value;

    const dateElement = document.querySelector("#date");
    const tempElement = document.querySelector("#temp");
    const contentElement = document.querySelector("#content");

    getWeather(zipCode)
        .then(async (data) => {
            await fetch('/postData', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    temp: data.main.temp,
                    date: currentDate,
                    content: userResponse
                })
            });
        }).then(async () => {
            const response = await fetch('/getData');
            const data = await response.json();

            // .textContent is faster than .innerHTML when we need only to update text.
            dateElement.textContent = data.date;
            tempElement.textContent = data.temp;
            contentElement.textContent = data.content;
        });
}

document.querySelector("#generate").addEventListener("click", generateCallBack);