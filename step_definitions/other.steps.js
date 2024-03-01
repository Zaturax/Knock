const assert = require('assert');

module.exports = function (options) {
  const {Step} = options;
  /**
   * Save a given element's value in an also given variable
   * e.g. And I keep the "appID" in variable "applicationID"
   */
  Step(
    'I keep the {string} in variable {string}',
    async function (element, variable) {
      const text = await global.page.textContent(global.config.paths[element]);
      global.config.variables[variable] = text.replace(/"/g, '');
    }
  );

  /**
   * Save the current url in a given variable
   * e.g. And I keep the current url in variable "dashboardUrl"
   */
  Step(
    'I keep the current url in variable {string}',
    async function (variable) {
      if (!global.variables) {
        global.variables = {};
      }
      global.variables[variable] = await global.page.url();
    }
  );

  Step (
    'I validate that I can see {int} instances of the {string} element',
    async function (count,element){
      await global.page.locator(global.config.paths[element]).nth(1).waitFor();
      assert(await global.page.locator(global.config.paths[element]).count()===count);
    }
  )

  Step (
    'I count the instances of the {string} element into {string}',
    async function (element,variable){
      global.config.variables[variable] = await global.page.locator(global.config.paths[element]).count();
    }
  )

  Step(
    /'\w*' is \d (more|less) than '\w*'/,
    async function (variable1,delta,option,variable2){
      if (option==='more'){
        assert(global.config.variables[variable1]+delta==global.config.variables[variable2])
      }else{
        assert(global.config.variables[variable1]==global.config.variables[variable2]+delta)
      }
    }
  )
};
