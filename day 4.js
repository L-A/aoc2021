const input = require("fs")
  .readFileSync("./inputs/day4.txt")
  .toString()
  .split("\n");

console.log(input);

const draws = input[0].split(",");

const cards = input.slice(2).reduce(
  (cards, line, i) => {
    const cardIndex = Math.floor(i / 6);
    const lineIndex = i % 6;
    if (lineIndex == 5) return cards;

    if (line.slice(0, 1) == " ") line = line.slice(1);
    cards[cardIndex][lineIndex] = line.replaceAll("  ", " ").split(" ");
    return cards;
  },
  [...Array(Math.floor((input.length - 2) / 6))].map((_) => [])
);

// Part 1
const cardHits = cards.map((c) => c.map((line) => line.map((_) => false)));
const controlForHits = (number) =>
  cards.forEach((card, cardIndex) => {
    card.forEach((line, lineIndex) => {
      line.forEach((value, rowIndex) => {
        if (number == value) cardHits[cardIndex][lineIndex][rowIndex] = true;
      });
    });
  });
const controlForVictory = () => {
  let winner = 0;
  cardHits.forEach((card, cardIndex) => {
    for (let x = 0; x < 5; x++) {
      let rowHitCount = 0;
      let colHitCount = 0;
      for (let y = 0; y < 5; y++) {
        if (card[y][x] === true) rowHitCount += 1;
        if (card[x][y] === true) colHitCount += 1;
        if (rowHitCount == 5 || colHitCount == 5) winner = cardIndex + 1;
      }
    }
  });
  return winner;
};

const totalUnmarkedNumbers = (cardIndex) => {
  const card = cards[cardIndex];
  const hits = cardHits[cardIndex];
  let total = 0;
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (hits[y][x] === false) total += Number(card[y][x]);
    }
  }
  return total;
};

let position = -1;
let winner = 0;
while (winner == 0 && position < draws.length) {
  position += 1;
  controlForHits(draws[position]);
  winner = controlForVictory();
}

let winningCard = cards[winner];
console.log(draws[position] * totalUnmarkedNumbers(winner - 1));

// Part 2
while (cards.length > 1) {
  position += 1;
  controlForHits(draws[position]);
  winner = controlForVictory();

  while (cards.length > 1 && winner !== 0) {
    cards.splice(winner - 1, 1);
    cardHits.splice(winner - 1, 1);
    winner = controlForVictory();
  }
}

while (controlForVictory() == 0) {
  position += 1;
  controlForHits(draws[position]);
}

console.log(cards[0][0]);
console.log(totalUnmarkedNumbers(0) * draws[position]);
