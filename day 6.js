const input = require("fs")
  .readFileSync("./inputs/day6.txt")
  .toString()
  .split(",")
  .map(Number);

const fish = [...Array(9)].map((_) => 0);

input.forEach((fishAge) => {
  fish[fishAge] += 1;
});

const cycle = (allFish, cycles) => {
  const newFish = allFish.slice();

  while (cycles > 0) {
    cycles--;
    const fishBirth = newFish[0];
    newFish[0] = 0;
    for (let i = 1; i <= 8; i++) {
      newFish[i - 1] += newFish[i];
      newFish[i] = 0;
    }
    newFish[8] += fishBirth;
    newFish[6] += fishBirth;
  }

  return newFish;
};

const totalFish = (fish) => fish.reduce((p, c) => p + c);

// Part 1
console.log("Part 1: ", totalFish(cycle(fish, 80)));

// Part 2
console.log("Part 2: ", totalFish(cycle(fish, 2048)));
