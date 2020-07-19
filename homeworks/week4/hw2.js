const request = require('request');
const process = require('process');

const API = 'https://lidemy-book-store.herokuapp.com';

const doWhat = process.argv[2];
const parameter = process.argv[3];

function getList() {
  request(
    `${API}/books?_limit=20`, (err, response, body) => {
      if (err) {
        console.log('失敗', +err);
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
}

function readBook(p) {
  const book = p;
  request(
    `${API}/books/${book}`, (err, response, body) => {
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
      console.log(json);
    },
  );
}

function deleteBook(p) {
  const bookId = p;
  request.delete(
    `${API}/books/${bookId}`, (err, response) => {
      if (err) {
        return console.log(`刪除失敗 ${err}`);
      }
      if (response.statusCode >= 200 && response.statusCode <= 300) {
        return console.log(`成功刪除 id 為${bookId} 的書籍 ${response.statusCode}`);
      }
      return console.log(`刪除失敗 statusCode 為${response.statusCode}`);
    },
  );
}

function createBook(p) {
  const newBook = p;
  request.post(
    {
      url: `${API}/books`,
      form: {
        name: `${newBook}`,
      },
    }, (err) => {
      if (err) {
        return console.log(`新增失敗 ${err}`);
      }
      return console.log(`成功新增 為${newBook} 的書籍`);
    },
  );
}
function updateBook(p) {
  const bookId = p;
  const newName = process.argv[4];
  request.patch(
    {
      url: `${API}/books/${bookId}`,
      form: {
        name: `${newName}`,
      },
    }, (err) => {
      if (err) {
        return console.log(`更新失敗 ${err}`);
      }
      return console.log(`更新 id 為 ${bookId} 的書名為 ${newName}`);
    },
  );
}

if (doWhat === 'update') {
  updateBook(parameter);
}
if (doWhat === 'list') {
  getList(parameter);
}
if (doWhat === 'read') {
  readBook(parameter);
}
if (doWhat === 'delete') {
  deleteBook(parameter);
}
if (doWhat === 'create') {
  createBook(parameter);
}
