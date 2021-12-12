const input = require("fs")
  .readFileSync("./inputs/day5.txt")
  .toString()
  .split("\n")
  .map((line) => {
    let [start, _, end] = line.split(" ").map((l) => l.split(",").map(Number));
    return [start[0], start[1], end[0], end[1]];
  });

const dimension =
  input.reduce((max, [a, b, c, d]) => Math.max(max, a, b, c, d), 0) + 1;
const grid = [...Array(dimension * dimension)].map((_) => 0);
const gridPos = (x, y) => (x % dimension) + y * dimension;

input

  // Uncomment the following filter for the first star
  // .filter(([startX, startY, endX, endY]) => startX == endX || startY == endY)

  .forEach(([startX, startY, endX, endY]) => {
    const delta = [endX - startX, endY - startY];
    const steps = Math.max(Math.abs(delta[0]), Math.abs(delta[1]));
    for (let step = 0; step <= steps; step++) {
      const x = startX + (delta[0] * step) / steps,
        y = startY + (delta[1] * step) / steps;
      grid[gridPos(x, y)] += 1;
    }
  });

console.log("Intersections: ", grid.filter((x) => x > 1).length);
