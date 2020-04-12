// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Test if the "service-worker.js" exists and is accessable
    fetch("/service-worker.js").then(result => {
        if (result.status >= 200 && result.status <= 399) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    });
}