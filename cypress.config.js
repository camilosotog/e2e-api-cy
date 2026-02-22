const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    // URL base para pruebas E2E
    baseUrl: 'https://www.demoblaze.com/',
    
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
