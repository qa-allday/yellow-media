const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //defaultCommandTimeout: 2000,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://ua.sinoptik.ua',
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
  },
});
