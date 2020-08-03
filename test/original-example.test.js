'use strict';

const { Eyes, Target, BatchInfo, RectangleSize } = require('@applitools/eyes-playwright');

describe('DemoApp - Original', function () {
  let eyes;

  beforeEach(async () => {
    // Initialize the eyes SDK and set your private API key
    eyes = new Eyes();

    // Add your API key (the API key can be set via APPLITOOLS_API_KEY env variable)
    eyes.setApiKey('APPLITOOLS_API_KEY'); // 👈🏼 REPLACE ME!

    // set new batch
    eyes.setBatch(new BatchInfo('Demo batch'))
  });

  it('Smoke Test', async () => {
    // Start the test and set the App name, the Test name and the browser's viewport size to 800x600.
    await eyes.open(browser, 'Demo App', 'Smoke Test', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    browser.get("https://demo.applitools.com");

    // To see visual bugs after the first run, use the commented line below instead.
    // await browser.get("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1 - Check the login page.
    await eyes.check("Login Window", Target.window().fully());

    // This will create a test with two test steps.
    element(by.id("log-in")).click();

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    const results = await eyes.close();
    console.log(results);
  });

  afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();
  });
});
