# Swag Labs E2E Automation Project

This project contains automated end-to-end tests for the [Swag Labs demo website](https://www.saucedemo.com/), implemented using **WebdriverIO** and the **Page Object Model (POM)** design pattern.

## Project Structure
- `test/pageobjects/`: Contains the page classes that model the website structure for better maintainability.
- `test/specs/`: Contains the actual test scripts.
- `wdio.conf.js`: WebdriverIO configuration file.

## Prerequisites
- Node.js installed on your machine.

## How to Run
1. Clone this repository.
2. Install dependencies:
   npm install
3. Run the tests:
  npx wdio run wdio.conf.js
