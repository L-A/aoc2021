const input = require("fs")
  .readFileSync("./inputs/day8.txt")
  .toString()
  .split("\n")
  .map((s) =>
    s
      .split(" | ")
      .map((s) => s.split(" ").map((s) => s.split("").sort().join("")))
  );

// Part 1
const isUniqueDigit = (a) =>
  a.length == 2 || a.length == 3 || a.length == 4 || a.length == 7;

const amountOfUniqueDigits = input.reduce(
  (total, [_, output]) => total + output.filter(isUniqueDigit).length,
  0
);

console.log("Number of 1,4,7,8s: ", amountOfUniqueDigits);

// Part 2
const segmentsMissing = (source, diff) => {
  // How many in the source aren't in the diff
  const splitDiff = diff.split("");
  let missing = 0;
  source.split("").forEach((segment) => {
    if (splitDiff.find((s) => s == segment) == undefined) missing++;
  });
  return missing;
};

const analyzeOutput = ([input, output]) => {
  // Uniques
  const one = input.find((s) => s.length == 2);
  const seven = input.find((s) => s.length == 3);
  const four = input.find((s) => s.length == 4);
  const eight = input.find((s) => s.length == 7);

  // Six and nine can be compared to 7 and 4
  const nine = input.find(
    (s) => s.length == 6 && segmentsMissing(four, s) == 0
  );

  const six = input.find(
    (s) =>
      s.length == 6 &&
      segmentsMissing(four, s) == 1 &&
      segmentsMissing(seven, s) == 1
  );

  // Then zero is the remaining character with six segments
  // completely overlaps seven, but missing one from 4
  const zero = input.find(
    (s) =>
      s.length == 6 &&
      segmentsMissing(six, s) == 1 &&
      segmentsMissing(nine, s) == 1
  );

  // Three is a 5-segment number that completely overlaps seven
  const three = input.find(
    (s) => s.length == 5 && segmentsMissing(seven, s) == 0
  );

  // Two is missing two segments from six and one from seven
  const two = input.find(
    (s) =>
      s.length == 5 &&
      segmentsMissing(six, s) == 2 &&
      segmentsMissing(seven, s) == 1
  );

  // Five is the remaining one, or:
  const five = input.find((s) => s.length == 5 && segmentsMissing(six, s) == 1);

  const characters = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ];

  return Number(
    output
      .map((character) => characters.findIndex((v) => v == character))
      .join("")
  );
};

console.log(
  "Total of outputs: ",
  input.reduce((total, line) => total + analyzeOutput(line), 0)
);
