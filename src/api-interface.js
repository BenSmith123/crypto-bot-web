
import axios from 'axios';
import { DISCORD_API_URL } from './environment';


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


async function getCommands() {
  try {
    const a = await axios(DISCORD_API_URL + ENDPOINTS.commands);
    return a.data;
  } catch (err) {
    return err.message; // TODO
  }
}


export {
  getChangelog,
  getCommands,
};
