/* eslint-disable no-alert */
// function showPrizePage() {
//   const lotteryArea = document.querySelector('.lottery_area');
//   const prizeArea = document.querySelector('.prize_page');
//   lotteryArea.classList.add('hidden');
//   prizeArea.classList.remove('hidden');
// }
// function getPrizeStatus(win) {
//   const bg = document.querySelector('.wrapper_bg');
//   function addTitle(str) {
//     const title = document.createElement('h1');
//     title.innerHTML = str;
//     document.querySelector('.prize_page').appendChild(title);
//   }
//   let prizeDesc = '';
//   switch (win) {
//     case 'FIRST':
//       bg.classList.add('first_bg');
//       prizeDesc += '恭喜你中頭獎了！日本東京來回雙人遊！';
//       addTitle(prizeDesc);
//       break;
//     case 'SECOND':
//       bg.classList.add('second_bg');
//       prizeDesc += '二獎！90 吋電視一台！';
//       addTitle(prizeDesc);
//       break;
//     case 'THIRD':
//       bg.classList.add('third_bg');
//       prizeDesc += '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
//       addTitle(prizeDesc);
//       break;
//     case 'NONE':
//       bg.classList.add('none_bg');
//       prizeDesc += '銘謝惠顧';
//       addTitle(prizeDesc);
//       break;
//     default:
//       alert('系統不穩定，請再試一次');
//       break;
//   }
// }
// function getResponseData() {
//   const request = new XMLHttpRequest();

//   request.onload = () => {
//     if (request.status >= 200 && request.status < 400) {
//       console.log(request.responseText);
//       let json;
//       try {
//         json = JSON.parse(request.responseText);
//         const { prize } = json;
//         getPrizeStatus(prize);
//         showPrizePage();
//       } catch (e) {
//         console.log(e);
//       }
//     } else {
//       alert('系統不穩定，請再試一次');
//     }
//   };
//   request.onerror = () => {
//     console.log('error');
//   };
//   request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
//   request.send();
// }
// function delPrizeElement() {
//   const prizeBg = document.querySelector('.wrapper_bg');
//   const prizeArea = document.querySelector('.prize_page');
//   const awardArray = ['first_bg', 'second_bg', 'third_bg', 'none_bg'];
//   for (let i = awardArray.length - 1; i >= 0; i -= 1) {
//     if (prizeBg.classList.contains(awardArray[i])) {
//       prizeBg.classList.remove(awardArray[i]);
//       prizeArea.childNodes[3].remove();
//     }
//   }
// }

// document.querySelector('.wrapper_bg').addEventListener('click', (e) => {
//   const { target } = e;
//   const parent = e.currentTarget;
//   if (target.classList.contains('event_btn')) {
//     try {
//       getResponseData();
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   if (target.classList.contains('return_btn')) {
//     const prizeArea = parent.childNodes[1];
//     const prizePage = parent.childNodes[3];
//     delPrizeElement();
//     prizePage.classList.add('hidden');
//     prizeArea.classList.remove('hidden');
//   }
// });

// 看完參考範例後改寫

function getPrizeStatus(win) {
  const bg = document.querySelector('.wrapper_bg');
  function addTitle(str) {
    const title = document.createElement('h1');
    title.innerHTML = str;
    document.querySelector('.prize_page').appendChild(title);
  }
  let prizeDesc = '';
  switch (win) {
    case 'FIRST':
      bg.classList.add('first_bg');
      prizeDesc += '恭喜你中頭獎了！日本東京來回雙人遊！';
      addTitle(prizeDesc);
      break;
    case 'SECOND':
      bg.classList.add('second_bg');
      prizeDesc += '二獎！90 吋電視一台！';
      addTitle(prizeDesc);
      break;
    case 'THIRD':
      bg.classList.add('third_bg');
      prizeDesc += '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
      addTitle(prizeDesc);
      break;
    case 'NONE':
      bg.classList.add('none_bg');
      prizeDesc += '銘謝惠顧';
      addTitle(prizeDesc);
      break;
    default:
      alert('系統不穩定，請再試一次');
      break;
  }
}
function getResponseData(cb) {
  const request = new XMLHttpRequest();
  const errMessage = '系統不穩定，請再試一次';

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText);
      let json;
      try {
        json = JSON.parse(request.responseText);
        const { prize } = json;
        if (typeof prize !== 'string') {
          return cb(errMessage);
        }
        return cb(null, prize);
      } catch (e) {
        console.log(e);
        return cb(errMessage);
      }
    } else {
      return cb(errMessage);
    }
  };
  request.onerror = () => console.log(errMessage);
  request.send();
}
document.querySelector('.wrapper_bg').addEventListener('click', (e) => {
  const { target } = e;
  if (target.classList.contains('event_btn')) {
    // eslint-disable-next-line consistent-return
    getResponseData((err, data) => {
      if (err) {
        return alert(err);
      }
      getPrizeStatus(data);
      document.querySelector('.lottery_area').classList.add('hidden');
      document.querySelector('.prize_page').classList.remove('hidden');
    });
  }
  if (target.classList.contains('return_btn')) {
    window.location.reload();// 直接畫面重新整理
  }
});
