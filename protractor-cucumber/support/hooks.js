'use strict';

const {defineSupportCode} = require('cucumber');
const rp = require('request-promise');

defineSupportCode(function({After,Before}){
  // Code to attach screenshot to the report on test failure
  After(function(scenario){
    //Capture the failing scenario
    let failedScenario = browser.params.failedScenarios
    if(scenario.isFailed()){
      let attach = this.attach;
      return browser.takeScreenshot().then(function(png){
        let decodedBase64Image = new Buffer(png,"base64");
        attach(decodedBase64Image,"image/png");
        failedScenario.push(scenario.scenario.name);

      });
    }
  });

});
