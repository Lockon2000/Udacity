import { makePending, stopPending } from './pending'


const urlRegEx = /^https?:\/\/.+\..+/i;

const urlElement = document.getElementById('url');
const resultsElement = document.getElementById('results');
const polarityElement = document.getElementById('polarity');
const subjectivityElement = document.getElementById('subjectivity');
const polarityConfElement = document.getElementById('polarity-confidence');
const subjectivityConfElement = document.getElementById('subjectivity-confidence');


function sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function handleSubmit(event) {
    event.preventDefault();

    // Reset all fields and properties
    resultsElement.style = "";
    polarityElement.value = "";
    subjectivityElement.value = "";
    polarityConfElement.value = "";
    subjectivityConfElement.value = "";

    // Test URL validity
    if (!(urlRegEx.test(urlElement.value))) {
        urlElement.setCustomValidity("Invalid URL format");
        urlElement.addEventListener("keydown", () => {
            urlElement.setCustomValidity("");
        })
        return;
    }

    try {
        makePending(polarityElement,
                    subjectivityElement,
                    polarityConfElement,
                    subjectivityConfElement);

        const response = await fetch(`/aylien?url=${urlElement.value}`);

        if (response.status >= 200 && response.status <= 399) {
            const data = await response.json();
            console.log(data);
            await sleep(1000); // To be able to see the pending behavior.
            
            stopPending();
            polarityElement.value = data['polarity'];
            subjectivityElement.value = data['subjectivity'];
            polarityConfElement.value = data['polarity_confidence'];
            subjectivityConfElement.value = data['subjectivity_confidence'];
        } else {
            stopPending();
            resultsElement.style = "color: red; font-weight: bold";
            polarityElement.value = "Error";
            subjectivityElement.value = "Error";
            polarityConfElement.value = "Error";
            subjectivityConfElement.value = "Error";
        }

    } catch(err) {
        console.log(err);
        resultsElement.style = "color: red; font-weight: bold";
        polarityElement.value = "Network Error";
        subjectivityElement.value = "Network Error";
        polarityConfElement.value = "Network Error";
        subjectivityConfElement.value = "Network Error";
    }

}

export { handleSubmit }
