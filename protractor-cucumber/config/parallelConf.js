exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: "https://www.moo.com/uk/",
  capabilities: {
    browserName: "chrome",
    // Below options are to hide the annoying password manager dialog in chrome
    chromeOptions: {
      prefs: {
        'credentials_enable_service': false,
        profile: {
          'password_manager_enabled': false
        }
      }
    },
    shardTestFiles: true,
    maxInstances: 2
  },
  beforeLaunch: function() {
    // Creating the directory for the reports
    const fs = require('fs');
    if (!fs.existsSync('htmlReports')) {
      fs.mkdirSync('htmlReports')
    }
    if (!fs.existsSync('jsonReports')) {
      fs.mkdirSync('jsonReports')
    }

  },
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../features/*.feature"],

  params:{
    // Time to wait for selenium explicit waits
    waits:{
      ecWaitTime:5000
    }
  },

  onPrepare: function() {

    const chai = require("chai");
    const chaiAsPromised = require("chai-as-promised");

    chai.use(chaiAsPromised);
    global.should = chai.should;
    global.expect = chai.expect;
    global.assert = require('chai').assert;
    // This config tells protractor not to wait for angular to be loaded
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();


  },
  /* This is to allow protractor to prevent protractor from aborting test execution when it
  encounters exceptions
  */
  ignoreUncaughtExceptions: true,
  cucumberOpts: {
    strict: true,
    format: ['json:jsonReports/cucumber_report.json'],
    require: ["../stepDefinitions/*.js", "../support/*.js"],
  },
  onComplete: function(){
    // Report generation code
    let createHtmlReport = function(){
      let reporter = require('cucumber-html-reporter');
      let reportingOptions = {
        theme: 'bootstrap',
        jsonDir:'jsonReports',
        output:'./htmlReports/cucumberReport.html',
        ignoreBadJsonFile:true,
        name:'Protractorcucumberparalleldemo'
      };
      reporter.generate(reportingOptions);
    };
    try{
      createHtmlReport();

    }
    catch(error){
      console.log("Error in generating reports ",error);
    }
    console.log("All tests completed");
  }
};
