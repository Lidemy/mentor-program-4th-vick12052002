const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const m = input[0];
  let arr = [];
  let a = 0;
  let b = 0;
  function numberIsBigger(c, d) {
    const cStr = c.toString();
    const dStr = d.toString();
    const same = 'DRWA';
    if (cStr.length > dStr.length) {
      return true;
    } if (cStr.length === dStr.length) {
      for (let i = 0; i < c.length; i += 1) {
        if (cStr[i] > dStr[i]) { return true; }
        if (cStr[c.length - 1] === dStr[d.length - 1]) { return same; }
      }
    }
    return false;
  }

  function printBig(numOne, numTwo) {
    if (numberIsBigger(numOne, numTwo) === 'DRWA') {
      return ('DRWA');
    } if (numberIsBigger(numOne, numTwo)) {
      return ('A');
    }
    return ('B');
  }
  function printSmall(x, z) {
    if (numberIsBigger(x, z) === 'DRWA') {
      return ('DRWA');
    } if (numberIsBigger(x, z)) {
      return ('B');
    }
    return ('A');
  }
  for (let i = 1; i <= m; i += 1) {
    arr = input[i].toString().split(' ');

    a = (arr[0]).toString();
    b = (arr[1]).toString();

    if (Number(arr[2]) === 1) {
      console.log(printBig(a, b));
    } else {
      console.log(printSmall(a, b));
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
