import * as geonames from "./geonames";
import * as weatherbit from "./weatherbit";
import * as pixabay from "./pixabay";


test("Test if 'geonames' provides the needed API", () => {
    expect(geonames.getGeoData).not.toBeUndefined();
});

test("Test if 'weatherbit' provides the needed API", () => {
    expect(weatherbit.getWeatherData).not.toBeUndefined();
});

test("Test if 'pixabay' provides the needed API", () => {
    expect(pixabay.getGuaranteedImageURL).not.toBeUndefined();
});