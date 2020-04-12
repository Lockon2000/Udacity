let timeoutID = null;
let n = 0;
let pendingElements = null;

function startPending(...formElements) {
    // Save the elements, so that we don't need to pass them again with stopPending()
    pendingElements = formElements;

    // Show Pending with an incremental amount of dots
    function cycle() {
        for (let element of pendingElements) {
            element.textContent = "Pending " + ".".repeat(n % 10);
        }
        ++n;

        timeoutID = setTimeout(cycle, 250);
    }

    cycle();
}

function stopPending() {
    clearTimeout(timeoutID);
    for (let element of pendingElements) {
        element.textContent = "";
    }
    n = 0;
}

export {
    startPending,
    stopPending
}