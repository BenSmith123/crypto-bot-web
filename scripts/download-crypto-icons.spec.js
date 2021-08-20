
const fs = require('fs');
const axios = require('axios');
const path = require('path');


const CRYPTO_ICONS_URL = 'https://cryptoicons.org/api';
const API_ENDPOINT = 'https://api.crypto.com/v2/public/get-instruments';

const imageSizePx = 32;


async function downloadImage(url, fileName) {

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const filePath = path.resolve(__dirname, '../images', `${fileName}.png`);
  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

}


// RUN SCRIPT!
(async () => {

  const res = await axios(API_ENDPOINT);

  const { instruments } = res.data.result;

  // get every crypto available on the crypto API that can be traded for USDT
  const cryptoList = instruments
    .filter((i) => i.quote_currency === 'USDT')
    .map((instrument) => (instrument.instrument_name.replace('_USDT', '')))
    .sort();

  console.log('Number of crypto currencies:', cryptoList.length);

  const missingIcons = [];

  for (let i = 0; i < cryptoList.length; i++) {

    const n = i + 1;

    const cryptoCode = cryptoList[i].toLowerCase();
    const imageUrl = `${CRYPTO_ICONS_URL}/white/${cryptoCode}/${imageSizePx}`;

    if (fs.existsSync(`./images/${cryptoCode}.png`)) {
      console.log(`${n}) ${cryptoCode} skipped`);
      continue;
    }

    try {

      await downloadImage(imageUrl, cryptoCode);
      console.log(`${n}) downloaded`);

    } catch (err) {

      if (err.response.status) {
        console.log(`${n}) ${cryptoCode} failed - 404`);
        missingIcons.push(cryptoCode);
        continue;
      }

      console.log(`${n}) ${cryptoCode} failed - ${err.message} (${imageUrl})`);
    }
  }

  console.log(`Number of missing icons: ${missingIcons.length}`);

  console.log('DONE! :)');

})();


