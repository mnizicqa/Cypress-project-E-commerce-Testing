const { defineConfig } = require("cypress");
const fs = require("fs-extra");
const path = require("path");
const cucumber = require("cypress-cucumber-preprocessor").default;

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress\\config", `${file}.json`);

  if (!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: "24k8e1",
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      // implement node event listeners here
      const file = config.env.configFile || "";

      return getConfigurationByFile(file);
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "https://www.saucedemo.com/",
    video: true,
    videoCompression: 40,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 80000,
    viewportHeight: 720,
    viewportWidth: 1080,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    },
    retries: {
      openMode: 1,
      runMode: 1,
    },
    experimentalStudio: true,
  },
});
