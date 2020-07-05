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
  console.log(n);
}

rl.on('close', () => {
  solve(lines);
});
