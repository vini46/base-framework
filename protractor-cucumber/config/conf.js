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
    }
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
    },
    failedScenarios:[],
    slackConfig:{
      /* Please create a webhook in slack and paste the URL as a value for webhookUrl
      If you don't know here is the link https://api.slack.com/incoming-webhooks
      */
      webhookUrl:undefined,
      channel:"#general"
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
  /* This is to allow  protractor to prevent it from from aborting test execution when the test throws
   exceptions it cannot handle
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
        name:'ProtractorCucumberDemo'
      };
      reporter.generate(reportingOptions);
    };
    try{
      createHtmlReport();

    }
    catch(error){
      console.log("Error in generating reports ",error);
    }
    let slackMessage = "";
    if ((browser.params.failedScenarios.length) >0) {
      slackMessage = "Tests failed , Failed scenarios "+(browser.params.failedScenarios.toString());

    }
    else {
      slackMessage = "E2E Tests passed succesfully,go have a chocolate";
    }
    const rp = require('request-promise');
    var options = {
       uri : browser.params.slackConfig.webhookUrl,
       method: 'POST',
       body: {
            'attachments': [{
                'title': "E2E Test",
                'text':slackMessage
            }]

        },
       channel: browser.params.slackConfig.channel,
       icon_emoji:":ghost:",
       mrkdwn: true,
       json:true
   };
   return rp(options)
        .then(function(res) {
          console.log("Notified via slack on ",browser.params.slackConfig.channel);
        })
        .catch(function(err) {
            console.log("Failed to send slack message ",err.message);
        });
  }
};
