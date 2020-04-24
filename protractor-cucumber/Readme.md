## Protractor Cucumber Boilerplate

These selenium tests are written using protractor along with cucumber. 

Framework features:

1. This framework produces
a html report which can be shared with stakeholders and also helps in debugging.
The html reports can be found under htmlReports directory.

2. Ability to capture screenshots on failure which are later attached to the report.

3. Sends message to slack on completion of test execution.


## Instructions for running tests

# Pre-requisities

1. [NodeJs](https://nodejs.org/en/download/)
2. [Chrome Browser](https://www.google.com/chrome/browser/desktop/index.html)


# Steps
1. Navigate to `protractor-cucumber` folder
2. Do `npm install`
3. Run `npm run webdriver-update`(This updates all the selenium drivers)
4. Run `npm run webdriver-start`(This starts the selenium server)
5. You can confirm this by visiting this [URL](http://localhost:4444/wd/hub/static/resource/hub.html)
6. Open a new terminal window and run `npm test` which runs all the tests.
7. To shut the selenium server just press `ctrl+c` in terminal window where the selenium server is running.

### Docker-usage

Alternatively if you don't want to run the tests in a local chrome browser or you do not have chrome installed on your machine you could run the tests in a docker selenium grid. For this to happen , make sure you have [docker](https://www.docker.com/docker-mac) installed on your system.

Now run `docker-compose up -d`, this should spin up a docker selenium grid with one chrome node.

If you are impatient and would like to speed up the test execution increase the chrome nodes by
`docker-compose scale chromenode=2` and then run `npm run paralleltest`

### PS:
All the above commands have been tested on OsX.
