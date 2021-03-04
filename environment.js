"use strict";

const fs = require("fs");

const removeLineBreaks = lines => {
    const [firstLine, secondLine, ...otherLines] = lines

    if (firstLine === undefined) {
        return [];
    }

    if (secondLine === undefined) {
        return [firstLine];
    }

    if (firstLine.endsWith("\\")) {
        return removeLineBreaks([`${firstLine.slice(0, -1)}${secondLine}`, ...otherLines]);
    }

    return [firstLine, ...removeLineBreaks([secondLine, ...otherLines])];

};

const replace = (environment, value) => {
    const SINGLE_QUOTE = "'";
    const DOUBLE_QUOTE = '"';
    if (value.startsWith(SINGLE_QUOTE) && value.endsWith(SINGLE_QUOTE)) {
        return value.slice(1, -1);
    }

    const replaced = Object.entries(environment).reduce((oldValue, [environmentKey, environmentValue]) => oldValue.replaceAll(`$${environmentKey}`, environmentValue), value);
    const withoutLeadingQuote = replaced.startsWith(DOUBLE_QUOTE) ? replaced.slice(1) : replaced;
    const withoutTrailingQuote = withoutLeadingQuote.endsWith(DOUBLE_QUOTE) ? withoutLeadingQuote.slice(0, -1) : withoutLeadingQuote;

    return withoutTrailingQuote;
};

const parse = (entries, environment = {}) => {
    if (entries.length === 0) {
        return environment;
    }

    const [[key, value], ...entriesLeft] = entries;

    return parse(entriesLeft, {...environment, [key.trim()]: replace(environment, value.trim())});
};

const Environment = {
    async from(path) {
        const LINE_RETURN = "\n";
        const COMMENT_TOKEN = "#";
        const ASSIGNMENT_TOKEN = "=";
        const buffer = await fs.promises.readFile(String(path));
        const content = buffer.toString();
        const lines = content.split(LINE_RETURN);
        const trimmedLines = lines.map(line => line.trim());
        const withoutLineBreaks = removeLineBreaks(trimmedLines);
        const linesWithoutComments = withoutLineBreaks.filter(line => !line.startsWith(COMMENT_TOKEN));
        const entries = linesWithoutComments.map(line => line.split(ASSIGNMENT_TOKEN));
        const entriesWithoutSyntaxError = entries.filter(entry => entry.length === 2);
        const environment = parse(entriesWithoutSyntaxError, {});

        return environment;
    }
};

module.exports = {Environment};