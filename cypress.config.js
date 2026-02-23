const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    // URL base para pruebas E2E
    baseUrl: 'https://www.demoblaze.com/',
    
    // Variables de entorno desde .env
    env: {
      PRODUCTS_CSV_PATH: process.env.PRODUCTS_CSV_PATH,
      BILLS_CSV_PATH: process.env.BILLS_CSV_PATH,
      USERS_CSV_PATH: process.env.USERS_CSV_PATH,
      DEMOBLAZE_API_URL: process.env.DEMOBLAZE_API_URL,
      DEFAULT_USERNAME: process.env.DEFAULT_USERNAME,
      DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    },
    
    // Configuración de specs
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    
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
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
