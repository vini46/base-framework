'use strict';

const businessPageLocators = require('../pageLocators/locators.js').businessCardLocators;
let BasePage = require('./basePage.js');


let BusinessCardPage = new BasePage();

BusinessCardPage.isCardDisplayed = isCardDisplayed;
BusinessCardPage.isProductPageLoaded = isProductPageLoaded;
BusinessCardPage.isPriceDisplayed = isPriceDisplayed;

function isPriceDisplayed(){
  return BusinessCardPage.getTextValue(businessPageLocators.quantity).then(quantity =>{
    let cardQuantity = (quantity.trim())
    return BusinessCardPage.getTextValue(businessPageLocators.price).then(price =>{
      let cardPrice = price;
      return Promise.resolve(cardQuantity+" "+cardPrice);
    })
  }).catch(err =>{
    console.log("Error reading text ",err);
    return Promise.reject(err);
  })
}

function isCardDisplayed(cardType){
  switch (cardType){
    case "Original Business Cards":
      return getBusinessCardType(cardType,0);
      break;
    case "Cotton Business Cards":
      return getBusinessCardType(cardType,1);
      break;
    case "Super Business Cards":
      return getBusinessCardType(cardType,2);
      break;
    case "Luxe Business Cards":
      return getBusinessCardType(cardType,3);
      break;
  }

}

function isProductPageLoaded(productPage){
  return loadProductPage(productPage).then(()=>{
    return getProductHeaderText().then(productText =>{
      if (productText === productPage){
        return Promise.resolve(true);
      }
    })
  }).catch(err =>{
    console.log("Failed to load page ",err);
    return Promise.reject(err);
  })

}

function getBusinessCardType(cardType,index){
  return BusinessCardPage.getTextValue(businessPageLocators.cardType.get(index)).then(text =>{
    if(text === cardType){
      return Promise.resolve(true);
    }
  }).catch(err =>{
      console.log("Error ",err);
      return Promise.reject(err);
  });

}

function loadProductPage(productPage){
  //ToDo: This is not an ideal way of navigating through pages , ideally we should click on href links

  switch (productPage){
    case "Business Cards":
      return BusinessCardPage.loadPage("https://www.moo.com/uk/products/business-cards.html");
      break;
    case "Original Business Cards":
      return BusinessCardPage.loadPage("https://www.moo.com/uk/products/original-business-cards.html");
      break;
  }

}

function getProductHeaderText(){
  return BusinessCardPage.getTextValue(businessPageLocators.productHeaderText).then(text =>{
    /*All the header text ends with with a full stop
    For eg: Business Cards. Postcards.
    */
    let sanitizedProductHeaderText = text.replace(".","");
    return Promise.resolve(sanitizedProductHeaderText);
  }).catch(err =>{
    console.log("Error getting product Text ",err);
    return Promise.reject(err);
  });
}


module.exports = BusinessCardPage;
