const {PerformanceObserver, performance} = require('perf_hooks');
const {steps} = require('../step_definitions');

function userInterfaceHooks(globals) {
  const {BeforeAll, Before, AfterAll, After, Step, playwright} = globals;
  const {launchOptions, pw} = playwright;

  Object.keys(steps).forEach(function (step) {
    steps[step].call(this, {Step});
  });

  BeforeAll(async () => {
    global.browser = await pw.chromium.launch(launchOptions);
    global.config.variables.retries = 0;
  });

  AfterAll(async () => {
    await global.browser.close();
  });

  Before(async () => {
    global.context = await global.browser.newContext({
      recordVideo: {dir: 'videos/'},
    });
    global.page = await global.context.newPage();
  });

  After(async scenario => {
    await global.page.close();
    await global.context.close();

    const video = await global.page.video();
    if (scenario.result.status !== 'PASSED') {
      await video.saveAs(
        `videos/${scenario.pickle.name.split(' ').join('-')}.webm`
      );
    }

    // https://github.com/microsoft/playwright/issues/4821
    // There is no way to avoid video creation so we have to delete it manually
    // if the test passes
    // The approach here is to save the file with the scenario name if the
    // scenario fails and then delete the original and delete the original
    // regardless the result
    await global.page.video().delete();
  });
}

module.exports = function (globals, options = {ui: true}) {
  const {Before, After } = globals;


  let performanceEntry = {};

  const obs = new PerformanceObserver(items => {
    [performanceEntry] = items.getEntries();
  });
  obs.observe({entryTypes: ['measure']});

  const testRun = {
    startDate: new Date().toString(),
    scenarios: [],
  };

  Before(async () => {
    performance.mark('BS');
  });
  After(async scenario => {
    performance.mark('AS');
    performance.measure('Scenario Duration', 'BS', 'AS');
    if (!scenario.result.willBeRetried) {
      testRun.scenarios.push({
        name: scenario.pickle.name,
        duration: performanceEntry.duration,
        result: scenario.result.status,
        retries: global.config.variables.retries,
        steps: scenario.pickle.steps.map(step => step.text),
      });
      global.config.variables.retries = 0;
    } else {
      global.config.variables.retries++;
    }
  });

  if (options.ui) {
    userInterfaceHooks(globals);
  }
};
