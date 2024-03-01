const fetch = import('node-fetch');

async function httpRequest(url, options) {
  const res = await fetch(url, options);
  const {status} = res;
  const body = await res.text();

  return {status, body};
}

module.exports = httpRequest;
