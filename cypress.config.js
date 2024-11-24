const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 70000,
    setupNodeEvents(on, config) {
      
    },
  },
});
