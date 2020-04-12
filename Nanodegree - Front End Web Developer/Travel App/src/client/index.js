// Webpack imports
import './scss/index.scss'
import './scss/dynamics.scss'


// JavaScript modules
import { sleep, resetCutomValidity } from './js/lib/helpers';
import { startPending, stopPending } from './js/lib/pending';
import { injectData } from './js/lib/dataInjection';


const questionsSection = document.querySelector("#questions");
const directionInput = document.querySelector("#direction");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");
const answersSection = document.querySelector("#answers");
const pendingInfoParagraph = document.querySelector("#progress-info");

document.querySelector("#send").addEventListener("click", async (event) => {
    // Show that the processing has started
    startPending(pendingInfoParagraph);

    /* Validation */

    // Check that the user specified a start date value
    if (startDateInput.value === "") {
        // Processing finished
        stopPending();

        startDateInput.setCustomValidity("Please select a valid date!");
        // Add event listener to remove the custom validity state
        startDateInput.addEventListener("input", resetCutomValidity)

        return;
    }

    // Check that the user specified an end date value
    if (endDateInput.value === "") {
        // Processing finished
        stopPending();

        endDateInput.setCustomValidity("Please select a valid date!");
        // Add event listener to remove the custom validity state
        endDateInput.addEventListener("input", resetCutomValidity)

        return;
    }

    const data = {
        direction: directionInput.value,
        startDate: new Date(startDateInput.value + "T00:00:00"),
        endDate: new Date(endDateInput.value + "T00:00:00"),
        currentDate: new Date(),
        get tripDistance() {
            return Math.ceil((this.startDate - this.currentDate) / (24 * 60 * 60 * 1000));
        },
        get tripLength() {
            return Math.ceil((this.endDate - this.startDate) / (24 * 60 * 60 * 1000));
        }
    };

    /* Validation */


    // Check that the user specified a start date after the present
    if (data.tripDistance < 0) {
        // Processing finished
        stopPending();

        startDateInput.setCustomValidity("Start date can't be in the past!");
        // Add event listener to remove the custom validity state
        startDateInput.addEventListener("input", resetCutomValidity)

        return;
    }

    // Check that the user specified an end date after the start date
    if (data.tripLength < 0) {
        // Processing finished
        stopPending();

        endDateInput.setCustomValidity("End date can't be before start date!");
        // Add event listener to remove the custom validity state
        endDateInput.addEventListener("input", resetCutomValidity)

        return;
    }

    const response = await fetch(`/api/process?direction=${data.direction}&tripDistance=${data.tripDistance}`);

    if (response.status >= 200 && response.status <= 399) {
        try {
            // Extend the data object with the returned response data object
            Object.assign(data, await response.json());
            console.log(data);

            injectData(data);

            // Showing the data is handled by the event listener on the image element further down
        } catch (err) {
            stopPending();
            console.log("Error while converting response to JSON and processing resutls!");
            console.log(response);

            throw Error(err)
        }
    } else {
        stopPending();
        console.log("The response status code is negative!");
        console.log(response);

        throw Error("Unsuccessful request!")
    }
});

// When the image has finished loading, display the data
document.querySelector("#answers .image-container img").addEventListener("loadend", () => {
    stopPending();

    questionsSection.classList.toggle("not-rendred");
    answersSection.classList.toggle("not-rendred");
})

// When the reset button is clicked, show the questions section again
document.querySelector("#resetButton").addEventListener("click", () => {
    questionsSection.classList.toggle("not-rendred");
    answersSection.classList.toggle("not-rendred");
});