const wd = require("wd");
/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "username";
/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "accessKey";

const buildName = process.env.LT_BUILD_NAME;
const appId = process.env.LT_APP_ID;
const deviceName = process.env.LT_DEVICE_NAME;
const deviceVersion = process.env.LT_DEVICE_VERSION;

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  app: appId, // Enter the 'app_url' here.
  build: buildName,
  name: "Sample Test NodeJS",
  deviceName: deviceName,
  isRealMobile: true,
  platformName: "android",
  platformVersion: deviceVersion,
  video: true,
  visual: true,
  tunnel: true
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);
const DEFAULT_TIMEOUT = 10000;
/**
 * Run an android test.
 */
async function runAndroidTest() {
  try {
    console.log(desiredCapabilities)
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
        url.type("https://www.ifconfig.me");
        return driver.waitForElementById("find", DEFAULT_TIMEOUT);
      })
      .then(function (find) {
        find.click();
        console.log("Test completed");
        driver.quit();
      });
  } catch (e) {
    console.log(e)
    driver.quit();
  }
  console.log("Test is running....");
}
runAndroidTest();
