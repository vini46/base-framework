'use strict';

const {defineSupportCode} = require('cucumber');

const BusinessCardPage = require('../pageObjects/pageMethods/businessCardPage.js');



defineSupportCode(function({Given,When,Then,setDefaultTimeout}){
  setDefaultTimeout(15*1000);

  When('I navigate to {stringInDoubleQuotes}', function (productPage) {
    return assert.eventually.equal(BusinessCardPage.isProductPageLoaded(productPage),true,"Failed to load page");

    });


  Then('I should see the following {stringInDoubleQuotes}', function (stringInDoubleQuotes, string) {
          // Write code here that turns the phrase above into concrete actions
          let businessCardTypes = (string.split("\n"));
          return assert.eventually.equal((BusinessCardPage.isCardDisplayed(businessCardTypes[0]) &&
            BusinessCardPage.isCardDisplayed(businessCardTypes[1]) &&
            BusinessCardPage.isCardDisplayed(businessCardTypes[2]) &&
            BusinessCardPage.isCardDisplayed(businessCardTypes[3])
          ),true,"Failed to load page");
        });

  Then('I should be able to view the price details', function () {
      return assert.eventually.equal(BusinessCardPage.isPriceDisplayed(),"50 Original Business Cards from £13.19","Price not displayed");
      });

});
