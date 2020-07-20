const request = require('request');

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    method: 'GET',
    headers: {
      'Client-ID': 'nbwup9lkd3o0kb3mm2cad0eep62y22',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  // eslint-disable-next-line consistent-return
  }, (err, response, body) => {
    if (err) {
      console.log(`讀取失敗 ${err}`);
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch (error) {
      return console.log(error);
    }
    for (let i = 0; i < data.top.length; i += 1) {
      console.log(
        `${data.top[i].viewers} ${data.top[i].game.name}`,
      );
    }
  },
);
