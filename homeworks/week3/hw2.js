const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const arr = input[0].split(' ');
  const n = Number(arr[0]);
  const m = Number(arr[1]);
  let sum = 0;
  let dig = '';
  function sumNumber(digit) {
    sum = 0;
    for (let t = 0; t < digit.length; t += 1) {
      sum += digit[t] ** digit.length;
    }
    return sum;
  }
  for (let i = n; i <= m; i += 1) {
    dig = i.toString();
    if (dig.length === 1) {
      console.log(i);
    } else if (sumNumber(dig) === i) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
