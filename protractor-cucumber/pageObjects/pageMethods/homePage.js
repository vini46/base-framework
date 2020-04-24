'use strict';

const homePageLocators = require('../pageLocators/locators.js').homePageLocators;
let BasePage = require('./basePage.js');


let HomePage = new BasePage();

HomePage.isPageLoaded = isPageLoaded;
HomePage.enterSearchQuery = enterSearchQuery;



function isPageLoaded(){
  return loadHomePage().then(() =>{
    return isMooLogoDisplayed().then(isDisplayed =>{
      return isSearchBoxDisplayed().then(isDisplayed =>{
          console.log("Home Page loaded successfully");
          return Promise.resolve(isDisplayed);

      });
    });

  }).catch(err =>{
    console.log("Failed to load homePage ",err);
    return Promise.reject(err);
  });

}


function loadHomePage(){
  return HomePage.loadPage(browser.baseUrl).then(()=>{
    return Promise.resolve(true);
  }).catch(err =>{
    console.log("Error loading page ",err);
    return Promise.reject(err);
  })
}

function isMooLogoDisplayed(){
  return HomePage.isElementDisplayed(homePageLocators.mooLogo);
}

function isSearchBoxDisplayed(){
  return HomePage.isElementDisplayed(homePageLocators.searchBox);
}

function enterSearchQuery(searchQuery){
  return isSearchBoxDisplayed().then(isDisplayed =>{
    HomePage.type(homePageLocators.searchBox,searchQuery);
    HomePage.press('Enter');
    return Promise.resolve(true);
  }).catch(err =>{
    console.log("Failed to enter text ",err);
    return Promise.reject(err);
  });
}


module.exports = HomePage;
