/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
function getTopGames(cb) {
  const request = new XMLHttpRequest();
  const clientId = 'nbwup9lkd3o0kb3mm2cad0eep62y22';
  const requestUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';
  request.open('GET', `${requestUrl}`, true);
  request.setRequestHeader('Authorization', 'OAuth cfabdegwdoklmawdzdo98xt2fo512y');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', clientId);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let json;
      try {
        json = JSON.parse(request.responseText);
        return cb(null, json.top);
      } catch (error) {
        console.log(error);
        return cb('錯誤');
      }
    } else {
      console.log('錯誤');
      return cb('錯誤');
    }
  };
  request.onerror = (err) => {
    console.log(err);
  };
  request.send();
}
function getTopStream(game, cbf) {
  const xhr = new XMLHttpRequest();
  const xhrUrl = 'https://api.twitch.tv/kraken/streams/';
  const clientId = 'nbwup9lkd3o0kb3mm2cad0eep62y22';
  const limit = 20;
  xhr.open('GET', `${xhrUrl}?limit=${limit}&game=${game}`, true);
  xhr.setRequestHeader('Authorization', 'OAuth cfabdegwdoklmawdzdo98xt2fo512y');
  xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  xhr.setRequestHeader('Client-ID', clientId);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      let json;
      try {
        json = JSON.parse(xhr.responseText);
        return cbf(null, json.streams);
      } catch (error) {
        console.log(error);
        return cbf('錯誤');
      }
    } else {
      console.log('錯誤');
      return cbf('錯誤');
    }
  };
  xhr.onerror = (err) => {
    console.log(err);
  };
  xhr.send();
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
  window.location.href = '/mentor-program-4th-vick12052002/homeworks/week8/hw2/index.html';
});
document.querySelector('.navbar').addEventListener('click', () => {
  const menuBtn = document.getElementById('menu_check');
  if (menuBtn.checked) {
    menuBtn.checked = false;
  }
});
