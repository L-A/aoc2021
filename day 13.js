const Grid = require("./helpers/grid");
const input = require("fs")
  .readFileSync("./inputs/day13.txt")
  .toString()
  .split("\n");

const dots = input
  .slice(0, input.indexOf(""))
  .map((s) => s.split(",").map(Number));
const folds = input
  .slice(input.indexOf("") + 1)
  .map((s) => [
    s.charAt(s.indexOf("=") - 1),
    Number(s.slice(s.indexOf("=") + 1)),
  ]);

const noDuplicates = ([dx, dy], index, self) =>
  self.findIndex(([x, y]) => dx == x && dy == y) == index;

const fold = (dots, [axis, value]) =>
  dots
    .map(([x, y]) => [
      axis == "x" && x > value ? value - (x - value) : x,
      axis == "y" && y > value ? value - (y - value) : y,
    ])
    .filter(noDuplicates);

const printDots = (dots) => {
  const [width, height] = dots.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(maxX, x + 1), Math.max(maxY, y + 1)],
    [0, 0]
  );

  let printableGrid = new Grid(width, height);
  printableGrid.setDefaultvalue(".");
  dots.forEach(([x, y]) => printableGrid.setValueAt(x, y, "#"));
  printableGrid.logGrid();
};

const foldAndMap = (dots, folds) => {
  let foldedDots = dots.slice();

  folds.forEach((singleFold) => {
    foldedDots = fold(foldedDots, singleFold);
  });

  printDots(foldedDots);
};

console.log("Dots after folding once: ", fold(dots, folds[0]).length);
foldAndMap(dots, folds);
