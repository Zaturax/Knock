const {load} = require('js-yaml');
const {readFileSync, readdirSync} = require('fs');
const {join} = require('path');
const rc = require('rc');

module.exports = (globals, options) => {
  const {dirname, logger} = globals;
  const {packageName} = options;

  // finds all the dashes and removes them. The first character after the dash
  // is capitalized
  const camelCasePN = packageName.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

  global.config = rc(camelCasePN, {variables: {}}, {config: 'config/env.json'});

  if (!global.config.env) {
    logger.error(
      'Environment need to be specified in order to run the tests. Missing env variable or env.json file'
    );
    process.exit(1);
  }

  const commonPath = join(dirname, 'common');
  let commonFiles = [];
  let dirExists = true;

  try {
    commonFiles = readdirSync(commonPath);
  } catch (e) {
    dirExists = false;
    logger.warning('No common configs. Skipping!\n', e.message);
  }

  if (commonFiles.length === 0 && dirExists) {
    logger.info('No common configs. Skipping!');
  } else {
    try {
      commonFiles.forEach(file => {
        const fileIdentifier = file.split('.yml')[0];
        const filePath = join(commonPath, file);
        const fileContent = load(readFileSync(filePath, 'utf8'));
        if (!global.config[fileIdentifier]) {
          global.config[fileIdentifier] = fileContent;
        } else {
          Object.keys(fileContent).forEach(key => {
            global.config[fileIdentifier][key] = fileContent[key];
          });
        }
      });
    } catch (e) {
      logger.error(`Unable to load file`, e.message);
    }
  }

  const scenarioPath = join(dirname, 'environments', global.config.env);
  let scenarioFiles = [];
  dirExists = true;
  try {
    scenarioFiles = readdirSync(scenarioPath);
  } catch (e) {
    dirExists = false;
    logger.warning('No environment specific configs. Skipping!', e.message);
  }

  if (scenarioFiles.length === 0 && dirExists) {
    logger.info('No environment specific configs. Skipping!');
  } else {
    try {
      scenarioFiles.forEach(file => {
        const fileIdentifier = file.split('.yml')[0];
        const filePath = join(scenarioPath, file);
        const fileContent = load(readFileSync(filePath, 'utf8'));
        if (!global.config[fileIdentifier]) {
          global.config[fileIdentifier] = fileContent;
        } else {
          Object.keys(fileContent).forEach(key => {
            global.config[fileIdentifier][key] = fileContent[key];
          });
        }
      });
    } catch (e) {
      logger.warning(`Unable to load file`, e.message);
    }
  }
};
