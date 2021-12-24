const AStar = require("./helpers/astar");
const Grid = require("./helpers/grid");

const input = require("fs")
  .readFileSync("./inputs/day15.txt")
  .toString()
  .split("\n")
  .map((line, y) =>
    line.split("").map((value, x) => ({
      x,
      y,
      id: `${x},${y}`,
      value: Number(value),
    }))
  );

const map = new Grid(input[0].length, input.length, input);

const increaseValue = (
  { x, y, value },
  increase,
  xIncrease = 0,
  yIncrease = 0
) => ({
  x: x + xIncrease,
  y: y + yIncrease,
  id: `${x + xIncrease},${y + yIncrease}`,
  value: ((value - 1 + increase) % 9) + 1,
});

let largeInput = input.map((line) => {
  let newLine = line.slice();
  let finalLine = line.slice();
  for (let x = 1; x < 5; x++) {
    finalLine = finalLine.concat(
      newLine.map((cell) => increaseValue(cell, x, input[0].length * x, 0))
    );
  }
  return finalLine;
});

const originalLargeInput = largeInput.slice();
for (let y = 1; y < 5; y++) {
  largeInput = largeInput.concat(
    originalLargeInput.map((line) =>
      line.map((cell) => increaseValue(cell, y, 0, input.length * y))
    )
  );
}
const bigMap = new Grid(largeInput[0].length, largeInput.length, largeInput);

const startID = "0,0";
const endID = `${input[0].length - 1},${input.length - 1}`;
const endNode = map.cells.find(({ id }) => id == endID);

const search = AStar(map.cells, {
  startID,
  endID,
  getID: ({ id }) => id,
  getNeighbors: ({ x, y }, nodes) =>
    nodes.filter(
      (n) =>
        (Math.abs(n.x - x) == 1 && n.y == y) ||
        (Math.abs(n.y - y) == 1 && n.x == x)
    ),
  getGScore: (node, neighbor) => neighbor.value,
  // 1/10th the Manhattan distance, better to underestimate
  getHScore: ({ x, y }) => (endNode.x - x + endNode.y - y) * 0.1,
});

// Second part is pretty slow but works
const secondEndID = `${largeInput[0].length - 1},${largeInput.length - 1}`;
const secondEndNode = bigMap.cells.find(({ id }) => id == secondEndID);
const largeSearch = AStar(bigMap.cells, {
  startID,
  endID: secondEndID,
  getID: ({ id }) => id,
  getNeighbors: ({ x, y }, nodes) =>
    nodes.filter(
      (n) =>
        (Math.abs(n.x - x) == 1 && n.y == y) ||
        (Math.abs(n.y - y) == 1 && n.x == x)
    ),
  getGScore: (node, neighbor) => neighbor.value,
  getHScore: ({ x, y }) => (secondEndNode.x - x + secondEndNode.y - y) * 0.1,
});

console.log("Final score: ", search.score);
console.log("Final score (5x): ", largeSearch.score);
