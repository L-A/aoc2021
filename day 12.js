const input = require("fs")
  .readFileSync("./inputs/day12.txt")
  .toString()
  .split("\n")
  .map((s) => s.split("-"));

const connections = input.slice();

const isSmall = (c) => {
  return c == c.toLowerCase();
};

const findPaths = (
  connections,
  startNode,
  endNode,
  allowDoubleSmallCave = false,
  doubleCaveSpent = false,
  parentPath = [],
  completedPaths = []
) => {
  let path = parentPath.slice();
  path.push(startNode);

  const connectedNodes = connections
    .filter((node) => node.findIndex((cave) => cave === startNode) !== -1)
    .map((caves) => caves.filter((cave) => cave !== startNode)[0]);

  connectedNodes.forEach((node) => {
    let localDoubleCaveSpent = doubleCaveSpent;
    let localPath = path.slice();
    if (isSmall(node)) {
      if (!allowDoubleSmallCave) {
        if (localPath.findIndex((n) => n == node) !== -1) return;
      } else {
        if (
          node == "start" ||
          (doubleCaveSpent && localPath.findIndex((n) => n == node) !== -1)
        ) {
          return;
        }
        if (
          !localDoubleCaveSpent &&
          localPath.filter((n) => n == node).length == 1
        ) {
          localDoubleCaveSpent = true;
        }
      }
    }
    if (node == endNode) {
      localPath.push(node);
      completedPaths.push(localPath);
    } else {
      completedPaths.concat(
        findPaths(
          connections,
          node,
          endNode,
          allowDoubleSmallCave,
          localDoubleCaveSpent,
          localPath,
          completedPaths
        )
      );
    }
  });

  return completedPaths;
};

console.log(
  "Without the double visit: ",
  findPaths(connections, "start", "end").length
);
console.log(
  "With the double visit: ",
  findPaths(connections, "start", "end", true).length
);
