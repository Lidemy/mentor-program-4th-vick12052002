const request = require('request');


const data = {
  url: 'https://lidemy-book-store.herokuapp.com/books',
  method: 'GET',
};

function topTenBooks(err, response, body) {
  const json = JSON.parse(body);
  for (let i = 0; i < 10; i += 1) {
    console.log(`${json[i].id} ${json[i].name} `);
  }
}
request(data, topTenBooks);
