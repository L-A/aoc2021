const input = require("fs")
  .readFileSync("./inputs/day3.txt")
  .toString()
  .split("\n")
  .map((s) => s.split(""));

// Part 1
const getRates = (input) => {
  const inputLength = input.length;
  const gammaRate = input[0].map((v, i) => {
    let accumulator = 0;
    input.forEach((line) => (accumulator += Number(line[i])));
    return accumulator >= inputLength / 2 ? 1 : 0;
  });
  const epsilonRate = gammaRate.map((v) => (v == "1" ? "0" : "1"));
  return {
    gammaRate,
    epsilonRate,
  };
};

const { gammaRate, epsilonRate } = getRates(input);
console.log(
  parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2)
);

// Part 2

let filteredInputs = input.slice(),
  position = 0;
while (filteredInputs.length > 1) {
  const { gammaRate } = getRates(filteredInputs);
  filteredInputs = filteredInputs.filter(
    (value) => value[position] == gammaRate[position]
  );
  position += 1;
}
const oxyRating = parseInt(filteredInputs[0].join(""), 2);

(filteredInputs = input.slice()), (position = 0);
while (filteredInputs.length > 1) {
  const { epsilonRate } = getRates(filteredInputs);
  filteredInputs = filteredInputs.filter(
    (value) => value[position] == epsilonRate[position]
  );
  position += 1;
}
const co2Rating = parseInt(filteredInputs[0].join(""), 2);

console.log(oxyRating * co2Rating);
