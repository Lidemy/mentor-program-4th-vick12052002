const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com';
request(
  `${url}/books?_limit=10`, (err, response, body) => {
    if (err) {
      console.log(`失敗 ${err}`);
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (wrong) {
      console.log(`轉換失敗 ${wrong}`);
      return;
    }
    for (let i = 0; i < json.length; i += 1) {
      console.log(`${json[i].id} ${json[i].name} `);
    }
  },
);
