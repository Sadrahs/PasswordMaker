# Password Maker

A small client-side password generator. Generates cryptographically
random passwords using the Web Crypto API, with configurable length
and character sets.

**Live demo:** _add link after deploying_

## Features

- Adjustable password length (8–32 characters)
- Toggle uppercase, lowercase, numbers, and symbols
- Uses `crypto.getRandomValues()` with rejection sampling for unbiased,
  cryptographically secure randomness (not `Math.random()`)
- One-click copy to clipboard
- Generates two passwords at once so you can pick

## Why `crypto.getRandomValues()` instead of `Math.random()`

`Math.random()` is not cryptographically secure and its output can be
predicted in some engines, which makes it unsuitable for anything
security-sensitive. This project uses the Web Crypto API instead, and
draws random bytes with rejection sampling so every character in the
chosen set has an equal chance of being picked (no modulo bias).

## Tech stack

- Vanilla HTML/CSS/JS
- [Vite](https://vitejs.dev/) for the dev server and build

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
