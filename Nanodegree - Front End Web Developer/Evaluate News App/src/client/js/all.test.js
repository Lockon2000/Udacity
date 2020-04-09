const formHandler = require("./formHandler")
const pending = require("./pending")

test("Test if 'formHandler' contains a 'handleSubmit' function", () => {
    expect(formHandler.handleSubmit).not.toBe(undefined);
});

test("Test if 'pending' contains a 'makePending' and a 'stopPending' function", () => {
    expect(pending.makePending).not.toBe(undefined);
    expect(pending.stopPending).not.toBe(undefined);
});