
import axios from 'axios';
import { WEB_API_URL } from './environment';


const ENDPOINTS = {
  changelog: 'changelog',
  commands: 'commands',
  currencies: 'currencies', // TODO - this endpoint is renamed in next release
  userConfiguration: 'user/configuration',
  userTransactions: 'user/transactions',
};


async function getChangelog() {
  try {
    const a = await axios(WEB_API_URL + ENDPOINTS.changelog);
    return a.data;
  } catch (err) {
    return err.message; // TODO
  }
}


async function getCommands() {
  try {
    const a = await axios(WEB_API_URL + ENDPOINTS.commands);
    return a.data;
  } catch (err) {
    return err.message; // TODO
  }
}


async function getCurrencies() {
  return axios(WEB_API_URL + ENDPOINTS.currencies);
}


async function getUserTransactions(accessToken) {

  throw new Error('Not implemented');

  const reqOptions = {
    url: WEB_API_URL + ENDPOINTS.userTransaction,
    headers: {
      accessToken,
    },
  };

  return axios(reqOptions);
}


async function getUserConfiguration(accessToken) {

  const reqOptions = {
    url: WEB_API_URL + ENDPOINTS.userConfiguration,
    headers: {
      accessToken,
    },
  };

  try {
    const a = await axios(reqOptions);
    return a.data;
  } catch (err) {
    return err.message; // TODO
  }
}


/**
 * POST /user/configuration
 *
 * @param {string} accessToken
 * @param {object} data - request body
 * @returns
 */
async function updateUserConfiguration(accessToken, data) {

  const reqOptions = {
    url: WEB_API_URL + ENDPOINTS.userConfiguration,
    method: 'POST',
    data,
    headers: {
      accessToken,
    },
  };

  try {
    const a = await axios(reqOptions);
    return a.data;
  } catch (err) {
    return {
      error: true,
      errMessage: err.message,
    };
  }
}


export {
  getChangelog,
  getCommands,
  getCurrencies,
  getUserConfiguration,
  getUserTransactions,
  updateUserConfiguration,
};
