const actions = require('./actions.steps');
const navigation = require('./navigation.steps');
const visualization = require('./visualization.steps');
const other = require('./other.steps');

module.exports = {
  steps: {
    actions,
    navigation,
    visualization,
    other,
  },
};
