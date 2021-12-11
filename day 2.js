const input = require("fs")
  .readFileSync("./inputs/day2.txt")
  .toString()
  .split("\n")
  .map((c) => c.split(" "));

// Part 1
let depth = 0,
  horizontal = 0;
input.forEach(([direction, distance]) => {
  distance = Number(distance);
  switch (direction) {
    case "forward":
      horizontal += distance;
      break;
    case "down":
      depth += distance;
      break;
    case "up":
      depth -= distance;
      break;
  }
});
console.log(depth, " x ", horizontal, " = ", depth * horizontal);

// Part 2

let depth2 = 0,
  horizontal2 = 0,
  aim = 0;
input.forEach(([direction, distance]) => {
  distance = Number(distance);
  switch (direction) {
    case "forward":
      horizontal2 += distance;
      depth2 += distance * aim;
      break;
    case "down":
      aim += distance;
      break;
    case "up":
      aim -= distance;
      break;
  }
});
console.log(depth2, " x ", horizontal2, " = ", depth2 * horizontal2);
