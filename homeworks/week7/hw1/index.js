/* eslint-disable no-unused-expressions */
// const btn = document.querySelector('.submit_box');

// // eslint-disable-next-line consistent-return
// btn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const inputValue = document.querySelectorAll('.input_data');
//   const name = document.getElementById('input_name').value;
//   const email = document.getElementById('input_email').value;
//   const phone = document.getElementById('input_phone').value;
//   const howToKnow = document.getElementById('input_know').value;
//   const advice = document.getElementById('input_advice').value;
//   const radioInput1 = document.getElementById('input_apply_type1');
//   const radioInput2 = document.getElementById('input_apply_type2');

//   function appendWarming(text, place) {
//     const warm = document.createElement('p');
//     warm.classList.add('warm_text');
//     warm.innerText = `${text}尚未填寫`;
//     place.appendChild(warm);
//   }
//   function checkValueEmpty(arr) {
//     for (let t = 0; t < arr.length - 1; t += 1) {
//       if (arr[t].value.length === 0) {
//         return false;
//       }
//     } return true;
//   }
//   function alertData(a, b) {
//     let checkType = a.parentElement.childNodes[3].innerText;
//     if (b.checked) {
//       checkType = b.parentElement.childNodes[3].innerText;
//     }
//     // eslint-disable-next-line no-alert
//     alert(`
//         暱稱：${name}
//         電子郵件：${email}
//         手機號碼：${phone}
//         報名類型：${checkType}
//         怎麼知道這個活動的：${howToKnow}
//         其他：${advice}
//         `);
//   }
//   function reset(array, c, d, last, next) {
//     const resetValue = array;
//     for (let g = 0; g < resetValue.length; g += 1) {
//       resetValue[g].value = '';
//       if (last === next) {
//         last.remove();
//       }
//       const type1 = c;
//       const type2 = d;
//       type1.checked = false;
//       type2.checked = false;
//     }
//   }
//   for (let i = 0; i < inputValue.length - 1; i += 1) {
//     const area = inputValue[i].parentElement;
//     const text = area.childNodes[1].innerText;
//     const areaLastChild = area.lastElementChild;
//     const inputNextElement = inputValue[i].nextElementSibling;
//     const areaChildNodes = area.parentElement.childNodes;

//     if (inputValue[i].type === 'radio') {
//       if (areaChildNodes.length < 8) {
//         if (!(radioInput1.checked && radioInput2.checked)) {
//           appendWarming(text, area.parentElement);
//         }
//       }
//       if (areaChildNodes.length === 8) {
//         if (radioInput1.checked || radioInput2.checked) {
//           areaChildNodes[areaChildNodes.length - 1].remove();
//         }
//       }
//     }
//     if (inputValue[i].value.length !== 0 && inputValue[i].type !== 'radio') {
//       if (areaLastChild === inputNextElement) {
//         areaLastChild.remove();
//       }
//     }
//     if (inputValue[i].value.length === 0) {
//       if (!(areaLastChild === inputNextElement)) {
//         appendWarming(text, area);
//       }
//     }
//     if (checkValueEmpty(inputValue) && (radioInput1.checked || radioInput2.checked)) {
//       alertData(radioInput1, radioInput2);
//       return reset(inputValue, radioInput1, radioInput2, areaLastChild, inputNextElement);
//     }
//   }
// }, false);

// 參考範例後，改寫
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const values = {};
  let hasError = false;
  const elements = document.querySelectorAll('.required');
  const advice = document.getElementById('input_advice');
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    const radios = element.querySelectorAll('input[type=radio]');
    const input = element.querySelector('.input_data');
    let isValid = true;
    if (input) {
      values[input.placeholder] = input.value;
      if (!input.value) {
        isValid = false;
      }
    } else if (radios.length) {
      isValid = [...radios].some(radio => radio.checked);
      if (isValid) {
        const radioChecked = element.querySelector('input[type=radio]:checked');
        const radioParent = radioChecked.parentNode.parentNode.childNodes[1].innerText;
        const radioValue = radioChecked.getAttribute('data_value');
        values[radioParent] = radioValue;
      }
    }

    if (!isValid) {
      element.classList.remove('hide-error');
      hasError = true;
    } else {
      element.classList.add('hide-error');
    }
  }

  if (!hasError) {
    const adviceTitle = advice.getAttribute('data_title');
    values[adviceTitle] = advice.value;
    alert(JSON.stringify(values));
  }
});
