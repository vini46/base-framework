'use strict';

const searchLocators = require('../pageLocators/locators.js').searchPageLocators;
let BasePage = require('./basePage.js');


let SearchPage = new BasePage();

SearchPage.isSearchResultsDisplayed = isSearchResultsDisplayed;
SearchPage.isInvalidSearchMessageDisplayed = isInvalidSearchMessageDisplayed

function isSearchResultsDisplayed(){
  return getSearchResultsCount().then(isMatching =>{
    return getSearchResultHeading("Business Cards").then(() =>{
      return isSearchTableDisplayed();
    })
  });

}

function isInvalidSearchMessageDisplayed(){
  return SearchPage.getTextValue(searchLocators.noMatchingSearchResults);
}

function getSearchResultHeading(searchQuery){
  return SearchPage.getTextValue(searchLocators.searchResultHeading).then(text =>{
    return isSearchResultHeading(searchQuery,text);
  });
}

function isSearchResultHeading(searchQuery,text){
    let x = text.split("\"");
    if (x[1].toLowerCase() === searchQuery.toLowerCase()){
      return Promise.resolve(true);
    }
    return Promise.reject(false);

}

function getSearchResultsCount(){

  return SearchPage.getTextValue(searchLocators.searchResultCount).then(text =>{
    return isSearchCountAndTimeDisplayed(text).then(isMatching=>{
      if (isMatching){
        return Promise.resolve(isMatching);
      }
      return Promise.reject(isMatching);
    })
  }).catch(err =>{
    console.log("Failed to get text ",err);
    return Promise.reject(err);
  });
}

function isSearchTableDisplayed(){
  return SearchPage.isElementDisplayed(searchLocators.searchResultsTable);
}

function isSearchCountAndTimeDisplayed(str){
  const regex = /[About]+[\s]+[\d\,]+[\s]+[results]+[\s]+\(+\d+(\.\d{1,2})+[\s]+[seconds]+\)/g;
  let matches;
  let resultArray= [];

  while ((matches = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matches.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      matches.forEach((match, groupIndex) => {
        resultArray.push(groupIndex);

      });

  }
  if (resultArray.length > 0){
    return Promise.resolve(true);
  }
  else{
    return Promise.reject(false);
  }

}

module.exports = SearchPage;
