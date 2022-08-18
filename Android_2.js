const wd = require("wd");

const username = process.env.LT_USERNAME || "username";
const accessKey = process.env.LT_ACCESS_KEY || "accessKey";
const lt_devices = process.env.LT_DEVICES;

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);
const DEFAULT_TIMEOUT = 10000;
/**
   * Run an android test.
   */
    async function runAndroidTest() {
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

const devices = JSON.parse(lt_devices);
console.log("devices : " + devices);

for (let i = 0; i < devices.length; i++) {
  
  const buildName = process.env.LT_BUILD_NAME;
  const appId = devices[i].appId;
  const deviceName = devices[i].deviceName;
  const deviceVersion = devices[i].deviceVersion;
  const platformName = devices[i].platformName;
  
  console.log("this caps : ", devices[i]);
  
  const desiredCapabilities = {
    app: appId, // Enter the 'app_url' here.
    build: buildName,
    name: "Sample Test NodeJS",
    deviceName: deviceName,
    isRealMobile: true,
    platformName: platformName,
    platformVersion: deviceVersion,
    video: true,
    visual: true,
  };
    runAndroidTest();
