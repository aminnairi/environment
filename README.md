# @aminnairi/environment

Easily parse your environment

![minified size of the package](https://img.shields.io/bundlephobia/minzip/@aminnairi/environment) ![vulnerability count according to Snyk.io](https://img.shields.io/snyk/vulnerabilities/github/aminnairi/environment) ![NPM package's download count per month](https://img.shields.io/npm/dw/@aminnairi/environment) ![support of TypeScript](https://img.shields.io/npm/types/@aminnairi/environment)

## Summary

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Simple](#simple)
  - [Fancy](#fancy)
  - [Interpollation](#interpollation)
  - [Non-interpollation](#non-interpollation)
  - [Multiline](#multiline)
  - [Comments](#comments)
  - [Undefined environment variables](#undefined-environment-variables)
  - [Multiple environments](#multiple-environments)
  - [Preview](#preview)
  - [Error handling (async/await)](#error-handling-(async/await))
  - [Error handling (Promise)](#error-handling-(promise))
- [CHANGELOG](#changelog)
- [CONTRIBUTING](#contributing)
- [LICENSE](#license)

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [NPX](https://www.npmjs.com/)

## Installation

```console
$ npm install --save-exact @aminnairi/environment@0.2.2
```

## Usage

### Simple

```console
$ touch .env
```

```
USER=johndoe
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.USER); // johndoe
};

main().catch(error => console.error(error.message));
```

### Fancy

```console
$ touch .env
```

```
USER        =   johndoe
PASSWORD    =   robustpassword
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.USER); // johndoe
    console.log(environment.PASSWORD); // robustpassword
};

main().catch(error => console.error(error.message));
```

### Interpollation

```console
$ touch .env
```

```
USER        =   johndoe
PASSWORD    =   robustpassword
HOST        =   domain
DATBASE     =   database
URL         =   "$USER:$PASSWORD@$DOMAIN/$DATABASE"
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.USER); // johndoe
    console.log(environment.PASSWORD); // robustpassword
    console.log(environment.DOMAIN); // domain
    console.log(environment.DATABASE); // database
    console.log(environment.URL); // johndoe:robustpassword@domain/database
};

main().catch(error => console.error(error.message));
```

### Non-interpollation

```console
$ touch .env
```

```
USER        =   johndoe
PASSWORD    =   robustpassword
HOST        =   domain
DATBASE     =   database
URL         =   '$USER:$PASSWORD@$DOMAIN/$DATABASE'
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.USER); // johndoe
    console.log(environment.PASSWORD); // robustpassword
    console.log(environment.DOMAIN); // domain
    console.log(environment.DATABASE); // database
    console.log(environment.URL); // $USER:$PASSWORD@$DOMAIN/$DATABASE
};

main().catch(error => console.error(error.message));
```

### Multiline

```console
$ touch .env
```

```
MOTD = Hello everyone \
        I Hope that you are okay today because \
        I'm felling great!
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.MOTD); // Hello everyone I Hope that you are okay today because I'm felling great!
};

main().catch(error => console.error(error.message));
```

### Comments

```console
$ touch .env
```

```
# This is our guild's name
GUILD_NAME = Outlawed

# This is our guild's main goal
GUILD_MAIN_OBJECTIVE = PVP

# This is our guild's secondary goal
GUILD_SECONDARY_OBJECTIVE = MM/HM
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.GUILD_NAME); // Outlawed
    console.log(environment.GUILD_MAIN_OBJECTIVE); // PVP
    console.log(environment.GUILD_SECONDARY_OBJECTIVE); // MM/HM
};

main().catch(error => console.error(error.message));
```

### Undefined environment variables

```console
$ touch .env
```

```
USER = johndoe
EMAIL = johndoe@noreply.users.github.com
```

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    const environment = await Environment.from(".env");

    console.log(environment.USER_NAME); // undefined
    console.log(environment.USER_EMAIL); // undefined
};

main().catch(error => console.error(error.message));
```

### Multiple environments

```console
$ touch index.js
```

```javascript
const {Environment} = require("./environment.min.js");

const main = async () => {
    const [local, prod, test] = await Promise.all([
        Environment.from(".env.local"),
        Environment.from(".env.prod"),
        Environment.from(".env.test")
    ]);

    console.log(local);
    console.log(prod);
    console.log(test);
};

main().catch(error => console.error(error.message));
```

### Preview

```console
$ touch .env
```

```env
USER=johndoe
PASSWORD=password
HOST=host
DATABASE=database
URL="$USER:$PASSWORD@$HOST/$DATABASE"
```

```console
$ npx @aminnairi/environment .env
"USER" "johndoe"
"PASSWORD" "password"
"HOST" "host"
"DATABASE" "database"
"URL" "johndoe:password@host/database"
```

### Error handling (async/await)

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

const main = async () => {
    try {
        const environment = await Environment.from("not-a-file.env");

        console.log(environment);
    } catch (error) {
        console.log("Something went wrong");
        console.error(error.message);
    }
};

main();
```

### Error handling (Promise)

```console
$ touch index.js
```

```javascript
const {Environment} = require("@aminnairi/environment");

Environment.from("not-a-file.env").then(environment => {
    console.log(environment);
}).catch(error => {
    console.log("Something went wrong");
    console.error(error.message);
});
```

## CHANGELOG

See [`CHANGELOG.md`](./CHANGELOG.md).

## CONTRIBUTING

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## LICENSE

See [`LICENSE`](./LICENSE).