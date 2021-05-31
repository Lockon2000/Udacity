export function throttle(time = 300) {
    function decorator(func) {
        let throttleTimeout = null;

        function decoratedFunction(...args) {
            if (throttleTimeout) clearTimeout(throttleTimeout);

            throttleTimeout = setTimeout(() => func(...args), time);
        }

        return decoratedFunction
    }

    return decorator;
}
