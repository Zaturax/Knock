module.exports = function (options) {
  const {Step} = options;
  Step('I go to the {string}', async function (name) {
    let url = global.config.hosts[name];
    if (url.port) {
      url = `${url.host}:${url.port}`;
    }
    await global.page.goto(url);
  });
};
