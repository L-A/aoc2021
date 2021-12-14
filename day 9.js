const input = require("fs")
  .readFileSync("./inputs/day9.txt")
  .toString()
  .split("\n")
  .map((line) => line.split("").map(Number));

let grid = input.slice();

const gridAt = ([x, y]) => grid[y][x];

const getNeighbors = ([x, y]) => {
  return [
    [x, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
  ].filter(
    ([x, y]) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
  );
};

const getLowPoints = (grid) => {
  let lowPoints = [];
  grid.forEach((line, y) =>
    line.forEach((height, x) => {
      const neighbors = getNeighbors([x, y]).map(([x, y]) => gridAt([x, y]));
      if (neighbors.findIndex((nHeight) => nHeight <= height) == -1)
        lowPoints.push({ x, y, height });
    })
  );
  return lowPoints;
};

const getBasinsTotal = (grid) => {
  let basins = [];
  getLowPoints(grid).forEach(({ x, y }) => {
    let total = 0;
    let queue = [[x, y]];
    let visited = [];
    let alreadyVisited = ([x, y]) =>
      visited.findIndex(([vx, vy]) => vx == x && vy == y) !== -1;
    let alreadyInQueue = ([x, y]) =>
      queue.findIndex(([qx, qy]) => qx == x && qy == y) !== -1;
    while (queue.length > 0) {
      const [x, y] = queue.shift();
      visited.push([x, y]);
      total += 1;
      const explorableNeighbors = getNeighbors([x, y]).filter(
        ([x, y]) =>
          !alreadyVisited([x, y]) &&
          !alreadyInQueue([x, y]) &&
          gridAt([x, y]) !== 9
      );
      explorableNeighbors.forEach((n) => queue.push(n));
    }
    basins.push(total);
  });
  return basins;
};

console.log(
  "Total low points value: ",
  getLowPoints(grid).reduce((acc, { height }) => acc + height + 1, 0)
);

console.log(
  "Product of three largest basins: ",
  getBasinsTotal(grid)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, b) => acc * b)
);
