
const axios = require('axios');
const { DISCORD_API_URL } = require('./environment');


const ENDPOINTS = {
  changelog: 'changelog',
  commands: 'commands',
  listCrypto: 'list-available-crypto',
};

async function getChangelog() {

  try {
    const a = await axios(DISCORD_API_URL + ENDPOINTS.changelog);
    return a.data;
  } catch (err) {
    return err.message; // TODO
  }

}

module.exports = {
  getChangelog,
};
