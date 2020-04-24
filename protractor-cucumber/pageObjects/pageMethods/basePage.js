'use strict';

let ec = protractor.ExpectedConditions;
let waitTime = browser.params.waits.ecWaitTime;


let BasePage = function(){

};


BasePage.prototype.isElementVisible = function(locator, wait= waitTime){
  return browser.wait(ec.visibilityOf(locator),wait);
};

BasePage.prototype.isElementDisplayed = function(locator){

  return this.isElementVisible(locator).then(() =>{
    return locator.isDisplayed().then(isVisible =>{
      return Promise.resolve(isVisible);
    });
  }).catch(err =>{
    console.log("Failed to locate the element ",err);
    return Promise.reject(err);
  });

};

BasePage.prototype.click = function(locator){
  this.isElementVisible(locator);
  return locator.click();
};

BasePage.prototype.loadPage = function(url){
  return browser.get(url);
};

BasePage.prototype.type= function(locator,text){
  this.isElementVisible(locator);
  return locator.sendKeys(text);

};

BasePage.prototype.press = function(keyName){
  switch(keyName){
    case 'Enter':
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }
}

BasePage.prototype.getTextValue = function(locator){
  this.isElementVisible(locator);
  return locator.getText();
}

module.exports = BasePage;
