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
  function printBig(numOne, numTwo) {
    if (numOne > numTwo) {
      return ('A');
    }
    return ('B');
  }
  function printSmall(x, z) {
    if (x < z) {
      return ('A');
    }
    return ('B');
  }
  for (let i = 1; i <= m; i += 1) {
    arr = input[i].toString().split(' ');

    a = Number(arr[0]);
    b = Number(arr[1]);

    if (Number(arr[2]) === 1) {
      console.log(printBig(a, b));
    } else if (a === b) {
      console.log('DRAW');
    } else {
      console.log(printSmall(a, b));
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
