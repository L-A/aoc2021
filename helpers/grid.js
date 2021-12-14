class Grid {
  constructor(width, height, initialData) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.length = this.cells.length;
    this.forEach = this.cells.forEach;
    initialData.forEach((line) => (this.cells = this.cells.concat(line)));
  }

  valueAt = (x, y) => this.cells[y * this.height + x];
  setValueAt = (x, y, value) => (this.cells[y * this.height + x] = value);

  find = (predicate) => this.cells.find(predicate);
  findPosition = (predicate) => {
    const index = this.cells.findIndex(predicate);
    if (index == -1) return undefined;
    return [index % this.width, Math.floor(index / this.width)];
  };

  cellNeighbors = (x, y, withDiagonals) =>
    [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ]
      .concat(
        withDiagonals
          ? [
              [x - 1, y - 1],
              [x + 1, y - 1],
              [x + 1, y + 1],
              [x - 1, y + 1],
            ]
          : []
      )
      .filter(
        ([x, y]) => x >= 0 && x < this.width && y >= 0 && y < this.height
      );

  logGrid = () => {
    for (let i = 0; i < this.height; i++) {
      console.log(
        this.cells.slice(i * this.width, (i + 1) * this.width).join("")
      );
    }
  };
}

module.exports = Grid;
