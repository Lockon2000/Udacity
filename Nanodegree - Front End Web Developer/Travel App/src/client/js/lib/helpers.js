function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function resetCutomValidity(event) {
    event.target.setCustomValidity("");
    // Remove the event listener to not accumulate them with every invalid input
    event.target.removeEventListener(event.type, resetCutomValidity);
}


export {
    sleep,
    resetCutomValidity
};