# Karate Boilerplate

## Karate - Rest API Automation Suite 

These API tests are written using Karate framework with Junit runner and JavaScript utility functions

Framework features:
1. This framework provides Cucumber HTML reports, which will be inside the folder '/target/cucumber-html-reports'
2. Ability to create fake data, Faker library integrated

## Instructions for running tests

### Pre-requisities
* [Maven](http://maven.apache.org/)
* [JDK](https://www.oracle.com/in/java/technologies/javase-downloads.html)

### Running tests 
1. Navigate to 'restapi-automation-karate' folder
2. do `mvn clean install -Dkarate.env="staging" -Dcucumber.options=""`


