'use strict';

const { Eyes, ClassicRunner, Target, RectangleSize, Configuration, BatchInfo} = require('@applitools/eyes-playwright');
const playwright = require('playwright')
const headless = process.env.CI === "true";
describe('DemoApp - ClassicRunner', function () {
  let runner, eyes, browser, page;

  beforeEach(async () => {
    // Initialize the playwright browser
    browser = await playwright.chromium.launch({headless})
    const context = await browser.newContext();
    page = await context.newPage();
    
    // Initialize the Runner for your test.
    runner = new ClassicRunner();

    // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
    eyes = new Eyes(runner);

    // Initialize the eyes configuration.
    const conf = new Configuration()

    // set new batch
    conf.setBatch(new BatchInfo("Demo Batch - Playwright - Classic"));

    // set the configuration to eyes
    eyes.setConfiguration(conf)
  });

  it('Smoke Test', async () => {
    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(page, 'Demo App - Playwright - Classic', 'Smoke Test - Playwright - Classic', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    await page.goto("https://demo.applitools.com");

    // To see visual bugs after the first run, use the commented line below instead.
    // await page.goto("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1 - Check the login page.
    await eyes.check("Login Window", Target.window().fully());

    // This will create a test with two test steps.
    await page.click("#log-in");

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    await eyes.close(false);
  });

  afterEach(async () => {
    // Close the browser
    await browser.close()
    
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abort();

    // Wait and collect all test results
    const allTestResults = await runner.getAllTestResults(false);
    console.log(allTestResults);
  });
});
