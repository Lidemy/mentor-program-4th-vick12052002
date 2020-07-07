const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const str = input[0];
  let compare = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    compare += str[i];
  }
  console.log(str === compare ? 'True' : 'False');
}

rl.on('close', () => {
  solve(lines);
});
