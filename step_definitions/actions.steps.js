const assert = require('assert');

module.exports = function (options) {
  const {Step} = options;
  Step('I click the {string} element', async function (element) {
    await global.page.waitForLoadState('networkidle');
    await global.page.click(global.config.paths[element]);
  });

  Step(
    'I fill the {string} element with {string}',
    async function (element, content) {
      const _content =
        global.config.inputs && global.config.inputs[content]
          ? global.config.inputs[content]
          : content;
      
      await global.page.fill(global.config.paths[element], _content);
    }
  );
};
