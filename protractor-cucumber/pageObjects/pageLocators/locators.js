'use strict';


const locators = {
  homePageLocators:{
    mooLogo: element(by.className('svg-icon header__logo')),
    searchBox: element(by.id('query'))
  },
  searchPageLocators:{
    searchResultsTable: element(by.className('gsc-results gsc-webResult')),
    searchResultHeading: element(by.tagName('h1')),
    searchResultCount:element(by.id('resInfo-0')),
    noMatchingSearchResults:element(by.className('gs-snippet'))
  },
  businessCardLocators:{
    productHeaderText: element(by.tagName('h1')),
    cardType:element.all(by.css('h3.h__block.u-mb--')),
    quantity:element(by.css('span.pre-price-text')),
    price:element(by.css('span.price-actual'))
  }

};

module.exports = locators;
