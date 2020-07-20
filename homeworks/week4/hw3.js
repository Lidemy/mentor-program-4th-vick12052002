const request = require('request');
const process = require('process');

const country = process.argv[2];
request(
  {
    url: `https://restcountries.eu/rest/v2/name/${country}`,
    method: 'GET',
  // eslint-disable-next-line consistent-return
  }, (err, response, body) => {
    if (err) {
      console.log(`取得失敗 ${err}`);
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch (error) {
      return console.log(error);
    }
    for (let i = 0; i < data.length; i += 1) {
      console.log(
        `============
國家：${data[i].name}
首都：${data[i].capital}
貨幣：${data[i].currencies[0].code}
國碼：${data[i].callingCodes}`,
      );
    }
  },
);
