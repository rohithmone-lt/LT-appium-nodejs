var wd = require("wd")
var assert  = require("assert");
var asserter = wd.asserters;

username = (process.env.LT_USERNAME == undefined) ? "username" //Enter the username here
        : process.env.LT_USERNAME
accesskey = (process.env.LT_ACCESS_KEY == undefined) ? "access_key" //Enter the access_key here
        : process.env.LT_ACCESS_KEY

buildName = process.env.LT_BUILD_NAME;
appId = process.env.LT_APP_ID;
deviceName = process.env.LT_DEVICE_NAME;
deviceVersion = process.env.LT_DEVICE_VERSION;

desired_capabilities = {
    'deviceName':deviceName,
    'platformVersion':deviceVersion,
    'platformName':'iOS',
    'isRealMobile':true,
    'app':appId, //Enter the app_url here
    'visual':true,
    'video': true,
    'build':buildName,
    'name': 'Sample Test - NodeJS'
}

console.log("buildName ", buildName);
console.log("appurl ", appId);

driver = wd.promiseRemote(`https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`)

async function iOStest() {
  try {
    driver
      .init(desiredCapabilities)
      .then(function () {
        return driver.waitForElementById("color", DEFAULT_TIMEOUT);
      })
      .then(function (colorButton) {
        return colorButton.click();
      })
      .then(function () {
        return driver.waitForElementById("Text", DEFAULT_TIMEOUT);
      })
      .then(function (text) {
        text.click();
        return driver.waitForElementById("toast", DEFAULT_TIMEOUT);
      })
      .then(function (toast) {
        toast.click();
        return driver.waitForElementById("notification", DEFAULT_TIMEOUT);
      })
      .then(function (notification) {
        notification.click();
        return driver.waitForElementById("geoLocation", DEFAULT_TIMEOUT);
      })
      .then(function (geoLocation) {
        geoLocation.click();
        return driver.waitForElementById("buttonPage", DEFAULT_TIMEOUT);
      })
      .then(function (Home) {
        Home.click();
        return driver.waitForElementById("speedTest", DEFAULT_TIMEOUT);
      })
      .then(function (speedTest) {
        speedTest.click();
        return driver.waitForElementById("webview", DEFAULT_TIMEOUT);
      })
      .then(function (Browser) {
        Browser.click();
        return driver.waitForElementById("url", DEFAULT_TIMEOUT);
      })
      .then(function (url) {
        url.type("https://www.lambdatest.com");
        return driver.waitForElementById("find", DEFAULT_TIMEOUT);
      })
      .then(function (find) {
        find.click();
        console.log("Test completed");
        driver.quit();
      });
  } catch (e) {
    driver.quit();
  }
  console.log("Test is running....");
}

iOStest();
