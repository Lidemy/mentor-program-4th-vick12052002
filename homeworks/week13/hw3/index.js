/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
function getTopGames(cb) {
  const clientId = 'nbwup9lkd3o0kb3mm2cad0eep62y22';
  const requestUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';

  fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: 'OAuth cfabdegwdoklmawdzdo98xt2fo512y',
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then(json => cb(null, json.top))
    .catch((err) => {
      console.log(err);
      return cb('錯誤');
    });
}

function getTopStream(game, cbf) {
  const apiUrl = 'https://api.twitch.tv/kraken/streams/';
  const clientId = 'nbwup9lkd3o0kb3mm2cad0eep62y22';
  const limit = 20;
  const gameApiUrl = `${apiUrl}?limit=${limit}&game=${game}`;
  fetch(gameApiUrl, {
    method: 'GET',
    headers: {
      Authorization: 'OAuth cfabdegwdoklmawdzdo98xt2fo512y',
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then(json => cbf(null, json.streams)).catch((err) => {
    console.log(err);
    return cbf('錯誤');
  });
}
function addStreams(data) {
  const streamsArea = document.querySelector('.top_chs');
  const stream = document.createElement('div');
  const template = `<div class='top_ch'>
  <a class='ch_url' href='${data.channel.url}' target='_blank'></a>
  <img src='${data.preview.large}'>
  <div class='ch_info'>
      <div class='ch_logo'>
          <img src='${data.channel.logo}'>
      </div>
      <div class='ch_desc'>
          <h3 class='ch_name'>${data.channel.status}</h3>
          <p class='ch_owner'>${data.channel.display_name}</p>
      </div>
  </div>
</div>`;
  streamsArea.appendChild(stream);
  stream.outerHTML = template;
}
function addEmptyStream() {
  const streamsArea = document.querySelector('.top_chs');
  const stream = document.createElement('div');
  stream.classList.add('top_ch');
  streamsArea.appendChild(stream);
}
function getPage() {
  const path = window.location.hash;
  const name = document.querySelector(path).getAttribute('game_name');
  const gameDescClassList = document.querySelector('.game_desc').classList;
  const top5AreaClassList = document.querySelector('.homepage_top_games').classList;
  const streamsArea = document.querySelector('.top_chs');
  streamsArea.innerHTML = '';
  if (gameDescClassList.contains('hidden')) {
    gameDescClassList.remove('hidden');
    top5AreaClassList.add('hidden');
  }
  document.querySelector('.game_title').innerHTML = name;
  getTopStream(name, (err, data) => {
    if (err) {
      return window.location.reload();
    }
    for (let i = 0; i < data.length; i += 1) {
      addStreams(data[i]);
    }
    addEmptyStream();
  });
}
function getHomepageTopGamesArea(data, index) {
  const homepageTopGames = document.querySelector('.homepage_top_games');
  const topGame = document.createElement('div');
  const template = `<div class='homepage_top_game' >
      <a href='#top${index + 1}'>
        <div class='top'>${data.name}</div>
        <img src='${data.box.large}'>
      </a>
    </div>`;
  homepageTopGames.appendChild(topGame);
  topGame.outerHTML = template;
}
function loadNavbar(data) {
  const navbarItems = document.querySelectorAll('.navbar_item');
  for (let i = 0; i < navbarItems.length; i += 1) {
    const { name } = data[i].game;
    navbarItems[i].innerHTML = `<a href="#top${i + 1}" id="top${i + 1}" game_name="${name}">${name}</a>`;
    getHomepageTopGamesArea(data[i].game, i);
  }
}
window.addEventListener('load', getTopGames((err, data) => {
  if (err) {
    return window.location.reload();
  }
  loadNavbar(data);
  const { hash } = window.location;
  if (hash) {
    return getPage();
  }
  document.querySelector('.game_title').innerHTML = 'Twitch Top five Games';
}));
window.addEventListener('hashchange', getPage);
document.getElementById('homepage').addEventListener('click', () => {
  window.location.href = '/homeworks/week13/hw3/index.html';
});
document.querySelector('.navbar').addEventListener('click', () => {
  const menuBtn = document.getElementById('menu_check');
  if (menuBtn.checked) {
    menuBtn.checked = false;
  }
});
