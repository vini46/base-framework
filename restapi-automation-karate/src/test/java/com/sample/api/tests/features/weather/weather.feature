@regression
Feature: Meta Weather API features

  Background:
    * url baseUrl

  Scenario: Get Lat Long Details
    Given path 'location/search/'
    And param query = 'chennai'
    When method get
    Then status 200
    And response.city == 'Chennai'
    And response.latt_long == '13.05939,80.245667'

  Scenario: Get cities from latlong
    Given path 'location/search/'
    And param lattlong = '13.05939,80.245667'
    When method get
    Then status 200
    * def responseLength = returnLength(response)
    And match responseLength == 10
    * match each response[*] contains {title: #notnull}
    Then match response[*].title == ['Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Surat', 'Kolkata', 'Ahmedabad', 'Dhaka', 'Yangon']
