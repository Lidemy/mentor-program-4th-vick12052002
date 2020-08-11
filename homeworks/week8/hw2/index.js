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
function addChannelInfoDesc(data) {
  const chDescArea = document.createElement('div');
  const chName = document.createElement('h3');
  const chOwner = document.createElement('p');
  chDescArea.classList.add('ch_desc');
  chName.classList.add('ch_name');
  chOwner.classList.add('ch_owner');
  chName.innerHTML = data.channel.status;
  chOwner.innerHTML = data.channel.display_name;
  chDescArea.appendChild(chName);
  chDescArea.appendChild(chOwner);
  return chDescArea;
}
function addChannelInfo(data) {
  const infoArea = document.createElement('div');
  const chLogo = document.createElement('div');
  const chLogoImg = document.createElement('img');
  const chLogoImgSource = document.createAttribute('src');

  infoArea.classList.add('ch_info');
  chLogo.classList.add('ch_logo');
  chLogoImgSource.value = data.channel.logo;
  chLogoImg.setAttributeNode(chLogoImgSource);
  chLogo.appendChild(chLogoImg);
  infoArea.appendChild(chLogo);
  infoArea.appendChild(addChannelInfoDesc(data));
  return infoArea;
}
function addChannel(data) {
  const channelsArea = document.querySelector('.top_chs');
  const channel = document.createElement('div');
  const channelUrl = document.createElement('a');
  const channelUrlSrc = document.createAttribute('href');
  const channelUrlTarget = document.createAttribute('target');
  const chPreview = document.createElement('img');
  const chPreviewSource = document.createAttribute('src');

  channel.classList.add('top_ch');
  channelUrl.classList.add('ch_url');
  channelUrlSrc.value = data.channel.url;
  channelUrlTarget.value = '_blank';
  channelUrl.setAttributeNode(channelUrlSrc);
  channelUrl.setAttributeNode(channelUrlTarget);

  chPreviewSource.value = data.preview.large;
  chPreview.setAttributeNode(chPreviewSource);

  channel.appendChild(channelUrl);
  channel.appendChild(chPreview);
  channel.appendChild(addChannelInfo(data));
  channelsArea.appendChild(channel);
}
function getPage() {
  const path = window.location.hash;
  const name = document.querySelector(path).getAttribute('game_name');
  const gameDescClassList = document.querySelector('.game_desc').classList;
  const top5AreaClassList = document.querySelector('.homepage_top_games').classList;
  const streamsArea = document.querySelector('.top_chs');
  const addNewStreamsArea = document.createElement('div');
  const gamesArea = document.querySelector('.games_area');
  if (streamsArea) {
    streamsArea.remove();
  }
  addNewStreamsArea.classList.add('top_chs');
  gamesArea.appendChild(addNewStreamsArea);

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
      addChannel(data[i]);
    }
  });
}
function getHomepageTopGamesArea(data, index) {
  const homepageTopGames = document.querySelector('.homepage_top_games');
  const topGame = document.createElement('div');
  const name = document.createElement('div');
  const gameImg = document.createElement('img');
  const source = document.createAttribute('src');
  const link = document.createElement('a');
  const href = document.createAttribute('href');
  topGame.classList.add('homepage_top_game');
  source.value = data.box.large;
  gameImg.setAttributeNode(source);
  href.value = `#top${index + 1}`;
  name.innerText = data.name;
  name.classList.add('top');
  link.setAttributeNode(href);
  link.appendChild(name);
  link.appendChild(gameImg);
  topGame.appendChild(link);
  homepageTopGames.appendChild(topGame);
}
function loadNavbar(data) {
  const navbarItems = document.querySelectorAll('.navbar_item');
  for (let i = 0; i < navbarItems.length; i += 1) {
    const link = document.createElement('a');
    const href = document.createAttribute('href');
    const id = document.createAttribute('id');
    const gameName = document.createAttribute('game_name');
    const { name } = data[i].game;
    href.value = `#top${i + 1}`;
    id.value = `top${i + 1}`;
    gameName.value = `${name}`;
    link.setAttributeNode(href);
    link.setAttributeNode(id);
    link.setAttributeNode(gameName);
    link.innerText = data[i].game.name;
    navbarItems[i].appendChild(link);
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
