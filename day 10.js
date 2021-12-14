const input = require("fs")
  .readFileSync("./inputs/day10.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const correspondances = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const isOpening = (c) => "{[<(".indexOf(c) !== -1;

const parseLine = (line, completeLine = false) => {
  let expectedQueue = [];
  let caught = false;
  line.forEach((character) => {
    if (caught) return;
    if (isOpening(character)) {
      expectedQueue.push(correspondances[character]);
    } else {
      if (expectedQueue.pop() !== character) caught = character;
    }
  });
  if (!completeLine) return caught;
  if (completeLine && !caught)
    return expectedQueue
      .reverse()
      .map((v) => "/)]}>".indexOf(v))
      .reduce((acc, b) => acc * 5 + b);
  return false;
};

console.log(
  "Score on invalid lines: ",
  input
    .map((l) => parseLine(l))
    .filter((v) => v)
    .map((v) => scores[v])
    .reduce((acc, b) => acc + b)
);

const lineScores = input
  .map((l) => parseLine(l, true))
  .filter((v) => v)
  .sort((a, b) => a - b);
console.log(
  "Score on valid and closed lines: ",
  lineScores[Math.floor(lineScores.length / 2)]
);
