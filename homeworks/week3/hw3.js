const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const n = input[0];
  const arr = lines.slice(1);
  function printFactor(t) {
    const array = [];
    for (let i = 1; i <= t; i += 1) {
      if (t % i === 0) {
        array.push(i);
      }
    }
    return (array.length);
  }
  for (let i = 0; i < n; i += 1) {
    if (Number(arr[i]) === 1) {
      console.log('Composite');
    } else if (printFactor(arr[i]) > 2) {
      console.log('Composite');
    } else if (printFactor(arr[i]) === 2) {
      console.log('Prime');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
