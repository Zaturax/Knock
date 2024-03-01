const common = `
  --require config/config.js
  --require support/hooks.js
  --require step_definitions/**/*.steps.js
  `;

module.exports = {
  default: `${common} features/**/*.feature --publish-quiet`,
};
