const {describe, it} = require("mocha");
const {expect} = require("chai");
const {Environment} = require("./environment.js");

describe("environment", () => {
    const maybeEnvironment = Environment.from(".env.example");

    it("should work with simple variables", () => {
        maybeEnvironment.then(environment => {
            expect(environment.NAME).to.equal("environment");
        });
    });

    it("should work with multi-line variables", () => {
        maybeEnvironment.then(environment => {
            expect(environment.MESSAGE).to.equal("This is a message");
        });
    });

    it("should work with interpollated variables", () => {
        maybeEnvironment.then(environment => {
            expect(environment.INTERPOLLATION).to.equal("The name of the package is environment");
        });
    });

    it("should work with static strings", () => {
        maybeEnvironment.then(environment => {
            expect(environment.STATIC).to.equal("The name of the package is $NAME");
        });
    });

    it("should work with spaced variables", () => {
        maybeEnvironment.then(environment => {
            expect(environment.SPACED).to.equal("Lots of spaces");
        });
    });

    it("should not work if the file is not found", () => {
        Environment.from(".env").catch(error => {
            expect(error).to.be.instanceof(Error);
        });
    });
});