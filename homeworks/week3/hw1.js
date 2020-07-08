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
  const star = '*';
  for (let i = 1; i <= n; i += 1) {
    console.log(star.repeat(i));
  }
}

rl.on('close', () => {
  solve(lines);
});
