const assert = require('assert');

module.exports = function (options) {
  const {Step} = options;
  Step('I should see the {string} element', async function (element) {
    await global.page.waitForSelector(global.config.paths[element]);
  });

  /**
   * Check if the value of an element's attribute matches the given one
   * The "element" attribute "attributeName" is attributeValue
   * e.g. The "Light Obfuscation template" attribute "class" is "templateEntry highlighted"
   */
  Step(
    /^the '(.*?)' attribute '(.*?)' (contains|is) '(.*?)'$/,
    async function (elementName, elementAttribute, match, value) {
      const element = await global.page.waitForSelector(
        global.config.paths[elementName]
      );
      if (match === 'contains') {
        const _element = await element.getAttribute(elementAttribute);
        assert(value.includes(_element));
      } else {
        assert(
          (await element.getAttribute(elementAttribute)) ===
            value.replace(/\\/g, '')
        );
      }
    }
  );

  /**
   * Check if the element's value matches the given one
   * e.g. And the "Version" content is 'currentVersion'
   * 'You don't have a profiling running for this application. Click \'Instrument Application\' to begin.'
   */
  Step(/^the '(.*?)' content is '(.*?)'$/, async function (element, value) {
    let actualValue = value;
    if (value === 'currentVersion') {
      actualValue = `Version ${global.config.version}`;
    }

    if (global.variables && global.variables[value]) {
      actualValue = global.variables[value];
    }
    let expected;
    let tries = 33;
    let timeout = 100;
    while (tries > 0) {
      try {
        expected = await global.page.textContent(global.config.paths[element]);
        if (expected === actualValue.trim().replace(/(\\|\n)/gm, '')) {
          break;
        }
      } catch (error) {
        console.log(error);
      } finally {
        tries--;
        await global.page.waitForTimeout(timeout);
        timeout += 100;
      }
    }

    assert(
      expected.trim().replace(/(\\|\n)/gm, '') ===
        actualValue.trim().replace(/(\\|\n)/gm, ''),
      `Expected ${expected.trim().replace(
        /(\\|\n)/gm,
        ''
      )} to equal ${actualValue.trim().replace(/\\/g, '')}`
    );
  });

  Step(/^the '(.*?)' content is not '(.*?)'$/, async function (element, value) {
    let actualValue = value;
    if (value === 'currentVersion') {
      actualValue = `Version ${global.config.version}`;
    } else if (global.variables && global.variables[value]) {
      actualValue = global.variables[value];
    }
    let expected;
    // 33 tries make the whole step duration spend 51600ms waiting
    // every step should be solved in under a minute
    let tries = 33;
    let timeout = 100;
    while (tries > 0) {
      try {
        expected = await global.page.textContent(global.config.paths[element]);
        if (expected !== actualValue.replace(/(\\|\n)/gm, '')) {
          break;
        } else {
          console.log(
            'Found: ',
            JSON.stringify(expected.replace(/(\\|\n)/gm, ''))
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        tries--;
        await global.page.waitForTimeout(timeout);
        timeout += 100;
      }
    }

    assert(
      expected.replace(/(\\|\n)/gm, '') !==
        actualValue.replace(/(\\|\n)/gm, ''),
      `Expected ${expected.replace(
        /(\\|\n)/gm,
        ''
      )} to be different from ${actualValue.replace(/\\/g, '')}`
    );
  });
};
