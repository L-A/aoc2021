const input = require("fs")
  .readFileSync("./inputs/day14.txt")
  .toString()
  .split("\n");

let startingPairs = {},
  startingCounts = {};

const addPair = (chain, pair, amount = 1) =>
  chain[pair] !== undefined ? (chain[pair] += amount) : (chain[pair] = amount);

const addCount = (counts, el, amount = 1) =>
  counts[el] !== undefined ? (counts[el] += amount) : (counts[el] = amount);

const splitPair = (chain, counts, pair, amount) => {
  const output = splits[pair];
  const [left, right] = pair.split("");
  addPair(chain, `${left}${output}`, amount);
  addPair(chain, `${output}${right}`, amount);
  addCount(counts, output, amount);
};

const pairInput = input[0]
  .split("")
  .map((left, i, self) => left + self[i + 1])
  .filter((x) => x.length == 2);

let splits = {};
input.slice(2).forEach((line) => {
  splits[line.slice(0, 2)] = line.slice(-1);
});

pairInput.forEach((pair) => {
  addPair(startingPairs, pair);
});

input[0].split("").forEach((element) => addCount(startingCounts, element));

console.log(startingPairs);

const cycle = ({ pairs, counts }) => {
  const cyclePairs = Object.keys(pairs);
  let newChain = {};
  cyclePairs.forEach((pair) => {
    const amount = pairs[pair];
    if (amount > 0 && amount !== undefined) {
      splitPair(newChain, counts, pair, amount);
    }
  });
  let total = Object.keys(counts).reduce(
    (total, key) => total + counts[key],
    0
  );
  return { pairs: newChain, counts, total };
};

const performCycles = (chain, cycleAmount) => {
  let newChain = chain;
  for (let step = 0; step < cycleAmount; step++) {
    newChain = cycle(newChain);
  }
  return newChain;
};

const leastTimesMost = (chain) => {
  let values = Object.values(chain.counts);
  return Math.max(...values) - Math.min(...values);
};

const shortChain = performCycles(
  { pairs: startingPairs, counts: startingCounts },
  10
);
console.log("After 10 steps: ", leastTimesMost(shortChain));

const longChain = performCycles(shortChain, 30);
console.log("After 40 steps: ", leastTimesMost(longChain));
