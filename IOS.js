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
    'network':true,
    'build':buildName,
    'name': 'Sample Test - NodeJS',
    'tunnel': true
}

console.log("buildName ", buildName);
console.log("appurl ", appId);

driver = wd.promiseRemote(`https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`)

async function iOStest(){

try {
console.log(desired_capabilities);
driver.init(desired_capabilities)
.then(function(){
    return driver.waitForElementById('color',10000)
})
.then(function(color){
    return color.click();
})
.then(function(){
    return driver.waitForElementById('Text',10000)
})
.then(function(text){
    text.click()
    return driver.waitForElementById('toast',10000)
})
.then(function(toast){
    toast.click()
    return driver.waitForElementById('notification',10000)
})
.then(function(notification){
    notification.click()
    return driver.waitForElementById('geoLocation',10000)
})
.then(function(geoLocation){
    return geoLocation.click()
})
.then(async function(){
    return driver.waitForElementById('Back',10000)
})
.then(function(back){
    back.click()
    return driver.waitForElementById('Browser',10000)
})
.then(function(Browser){
    Browser.click()
    return driver.waitForElementById('url',10000)
})
.then(function(url){
    url.type("https://www.ifconfig.me/")
    return driver.waitForElementById('find', 10000)
})
.then(function(find){
    find.click()
    driver.quit()
    console.log("Test completed");
})
}
catch (e) {
    driver.quit()
}
console.log("Test is running....");
}

iOStest();
