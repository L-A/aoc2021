const input = require("fs")
  .readFileSync("./inputs/day7.txt")
  .toString()
  .split(",")
  .map(Number);

const maxValue = input.reduce((prev, v) => Math.max(prev, v));

const destinationCosts = [...Array(maxValue + 1)].map((_, position) =>
  input.reduce(
    (total, startingPosition) => total + Math.abs(startingPosition - position),
    0
  )
);

const incrementalDestinationCosts = [...Array(maxValue + 1)].map(
  (_, position) =>
    input.reduce((total, startingPosition) => {
      const distance = Math.abs(startingPosition - position);
      const incrementalCost = ((distance + 1) * distance) / 2;
      return total + incrementalCost;
    }, 0)
);

const cheapestDestination = (costs) =>
  costs.reduce(
    ([lowestIndex, lowestValue], value, index) => {
      if (value < lowestValue) return [index, value];
      return [lowestIndex, lowestValue];
    },
    [-1, Infinity]
  );

console.log(cheapestDestination(destinationCosts));
console.log(cheapestDestination(incrementalDestinationCosts));
