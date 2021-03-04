"use strict";

const {describe, it,before, after} = require("mocha");
const {expect} = require("chai");
const {Environment} = require("./environment.js");
const {promises: fs} = require("fs");
before(async () => {
    try {
        await fs.writeFile(".env.example", `
                # This is a comment
                NAME=environment

                # This is a multiline message actually
                MESSAGE=This \\
                            is \\
                            a \\
                            message

                # This is a string that will be interpollated
                INTERPOLLATION="The name of this package is $NAME"

                # This string will never be interpollated
                STATIC='The name of this package is $NAME'

                # For the fancy ones
                SPACED      =       Lots of spaces
            `);
    } catch (error) {
        console.error(error.message);
    }
});

after(async () => {
});

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