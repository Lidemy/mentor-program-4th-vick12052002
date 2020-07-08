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
  function IsBigger(c, d) {
    const same = 'DRAW';
    if (c === d) { return same; }
    if (c.length > d.length) { return true; }
    if (c.length === d.length) { return c > d; }
    return false;
  }
  function printBig(z, x) {
    if (IsBigger(z, x) !== 'DRAW') { return IsBigger(z, x) ? 'A' : 'B'; }
    return 'DRAW';
  }

  function printSmall(k, g) {
    if (IsBigger(k, g) !== 'DRAW') { return IsBigger(k, g) ? 'B' : 'A'; }
    return 'DRAW';
  }
  for (let i = 1; i <= m; i += 1) {
    const arr = input[i].split(' ');
    const a = arr[0];
    const b = arr[1];
    const c = arr[2];
    if (Number(c) === 1) {
      console.log(printBig(a, b));
    } else { console.log(printSmall(a, b)); }
  }
}

rl.on('close', () => {
  solve(lines);
});
