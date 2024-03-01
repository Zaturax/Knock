const globalConfig = require('../support/global-config');
const logger = require('../support/logger');

// eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
const {name: packageName} = require(`${__dirname}/../package.json`);

globalConfig(
  {dirname: __dirname, logger},
  {
    packageName,
  }
);
