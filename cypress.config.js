const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL base para pruebas E2E
    baseUrl: 'https://www.saucedemo.com/',
    
    // Configuración de specs
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    
    // Configuración de viewports
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // Reintentos
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Videos y screenshots
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // reportes
    reporter: 'spec',
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
