# Changelog

## Summary

- [`0.2.2`](#022)
- [`0.2.1`](#021)
- [`0.2.0`](#020)
- [`0.1.0`](#010)

## Versions

## 0.2.2

### Major changes

None.

### Minor changes

None.

### Patches

- Fixed the version in the `README.md` file.

### 0.2.1

#### Major changes

None.

#### Minor changes

None.

#### Patches

- Fixed an issue that prevented using the cli because of a missing `bin` property in the `package.json` file.

### 0.2.0

#### Major changes

None.

#### Minor changes

- Multi-line variables are now supported.
- Added links for the changelog's requirements.
- Added a new Test section documenting unit tests in the changelog.
- All JavaScripts are now in strict mode.
- Added instructions to create and delete a test environment file for the unit tests.
- All versions are now fixed in the `package.json`.
- Added a constraint for using this library within the `package.json` since the `replaceAll` method has been introduce with Node 15.
- Added instructions on how to install the library with an exact version in the `README.md`.
- Added instructions on how to use multi-line variables in the `README.md`.
- Added many badges to the `README.md` file.
- It is now possible to "quick peek" at what the parser will return without having to test it in a script but rather on the cli with `npx @aminnairi/environment .env`.

#### Patches

- Fixed an issue that prevented using the function `Environment.from` correctly due to incorrect TypeScript type definitions.

### 0.1.0

#### Major changes

None.

#### Minor changes

None.

#### Patches

None.