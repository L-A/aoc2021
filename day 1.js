const input = require("fs")
  .readFileSync("./inputs/day1.txt")
  .toString()
  .split("\n")
  .map(Number);

// Part 1
const timesDescended = input.reduce((pr, curr, i) => {
  if (i == 0) return pr;
  const prev = input[i - 1];
  if (curr > prev) return pr + 1;
  return pr;
}, 0);
console.log(timesDescended);

// Part 2
const increasedWindows = input.reduce((pr, _, i) => {
  if (i > input.length - 3 || i == 0) return pr;
  const previousWindow = input[i - 1] + input[i] + input[i + 1];
  const window = input[i] + input[i + 1] + input[i + 2];
  if (window > previousWindow) return pr + 1;
  return pr;
}, 0);
console.log(increasedWindows);
