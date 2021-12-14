const Grid = require("./helpers/grid");
const input = require("fs")
  .readFileSync("./inputs/day11.txt")
  .toString()
  .split("\n")
  .map((l) => l.split("").map(Number));

const overNine = (c) => c > 9;

const cycle = (steps = 1, seekSync) => {
  let squidGrid = new Grid(input[0].length, input.length, input);

  let flashes = 0;
  for (let step = 0; step < steps; step++) {
    squidGrid.cells = squidGrid.cells.map((x) => x + 1);
    let flashed = [];
    while (squidGrid.find(overNine) !== undefined) {
      const [x, y] = squidGrid.findPosition(overNine);
      if (flashed.findIndex((f) => f == `${x}, ${y}`) !== -1) return;
      const neighbors = squidGrid.cellNeighbors(x, y, true);
      flashed.push(`${x}, ${y}`);

      neighbors.forEach(([x, y]) => {
        if (flashed.findIndex((f) => f == `${x}, ${y}`) !== -1) return;
        squidGrid.setValueAt(x, y, squidGrid.valueAt(x, y) + 1);
      });
      squidGrid.setValueAt(x, y, 0);
      flashes += 1;
    }
    if (seekSync && flashed.length == squidGrid.cells.length) {
      return step + 1;
    }
  }
  return flashes;
};

console.log("Flashes after 100 cycles: ", cycle(100));
console.log("First sync: ", cycle(1000, true));
