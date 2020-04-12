import * as helpers from "./helpers";
import * as pending from "./pending";
import * as dataInjection from "./dataInjection";


test("Test if 'helpers' provides the needed API", () => {
    expect(helpers.sleep).not.toBeUndefined();
    expect(helpers.resetCutomValidity).not.toBeUndefined();
});

test("Test if 'pending' provides the needed API", () => {
    expect(pending.startPending).not.toBeUndefined();
    expect(pending.stopPending).not.toBeUndefined();
});

test("Test if 'dataInjection' provides the needed API", () => {
    expect(dataInjection.injectData).not.toBeUndefined();
});