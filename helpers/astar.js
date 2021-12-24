const AStar = (
  nodes,
  { startID, endID, getID, getNeighbors, getGScore, getHScore },
  maxIterations = 10000000
) => {
  // Setup helpers
  const getNode = (nodeID) => nodes.find((n) => getID(n) == nodeID);

  let iteration = 0; // Just to "burn out" the loop if it's endless
  let openSetIDs = [startID];
  let gScore = [],
    fScore = [];
  let pathFrom = [];

  gScore[startID] = 0;
  fScore[startID] = getHScore(getNode(startID));

  while (openSetIDs.length > 0 && iteration < maxIterations) {
    const currentID = openSetIDs.pop();
    if (currentID == endID)
      return {
        path: reconstructedPath(pathFrom, startID, endID),
        score: fScore[currentID],
      };

    const node = getNode(currentID);
    const neighbors = getNeighbors(node, nodes);

    neighbors.forEach((neighbor) => {
      const neighborID = getID(neighbor);
      const possibleGScore = gScore[currentID] + getGScore(node, neighbor);

      // Is the new path to this neighbor the most efficient one,
      // or the very first one? If not, we're done.
      if (
        possibleGScore > gScore[neighborID] &&
        gScore[neighborID] !== undefined
      )
        return;

      // Otherwise, this is the most efficient path!
      pathFrom[neighborID] = currentID;
      gScore[neighborID] = possibleGScore;
      fScore[neighborID] = possibleGScore + getHScore(neighbor);
      if (!openSetIDs.includes(neighborID)) {
        openSetIDs.push(neighborID);
      }
    });

    iteration++;
    openSetIDs = openSetIDs.sort((aID, bID) => fScore[bID] - fScore[aID]);
  }

  console.log("Open set empty!");
  return { path: [], score: Infinity };
};

const reconstructedPath = (pathsFrom, startID, endID) => {
  let currentID = endID;
  let path = [endID];
  while (currentID !== startID) {
    currentID = pathsFrom[currentID];
    path.push(currentID);
  }
  path.reverse();
  return path;
};

module.exports = AStar;
