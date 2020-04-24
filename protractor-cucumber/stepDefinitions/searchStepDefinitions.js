'use strict';

const {defineSupportCode} = require('cucumber');

const homePage = require('../pageObjects/pageMethods/homePage.js');
const searchPage = require('../pageObjects/pageMethods/searchPage.js');


defineSupportCode(function({Given,When,Then,setDefaultTimeout}){
  setDefaultTimeout(15*1000);

  Given('I am on Moo homepage', function () {
         return assert.eventually.equal(homePage.isPageLoaded(),true,"Failed to load the home page");
  });

  When('I search for {stringInDoubleQuotes}', function (searchQuery) {
        return assert.eventually.equal(homePage.enterSearchQuery(searchQuery),true,"Failed to enter search query");
  });

  Then('I should see matching results for {stringInDoubleQuotes}', function (el) {
        return assert.eventually.equal(searchPage.isSearchResultsDisplayed(),true,"Search results not displayed.");
  });

  Then('I should see a user friendly message for {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
        const invalidMessageText= `Sorry we couldn’t find anything. Please check the spelling or alternatively chat to our friendly customer services team using the chat below.`
        return assert.eventually.equal(searchPage.isInvalidSearchMessageDisplayed(),invalidMessageText,"Message not displayed");
         });


})
