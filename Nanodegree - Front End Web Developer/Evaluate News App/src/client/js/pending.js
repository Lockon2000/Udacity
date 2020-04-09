let timeoutID = null;
let n = 0;

function makePending(...formElements) {
    function showInteration() {
        for (let formElement of formElements) {
            formElement.value = "Pending " + ".".repeat(n%10);
        }
        ++n;

        timeoutID = setTimeout(showInteration, 250);
    }

    showInteration();
}

function stopPending() {
    clearTimeout(timeoutID);
    n = 0; // reset n.
}

export {
    makePending,
    stopPending
}