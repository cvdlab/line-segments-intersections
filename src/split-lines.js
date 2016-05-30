module.exports = function splitLines (lines, intersections) {

  let splittedLines = [];
  let linesCutPoints = new Map();

  lines.forEach(line => {
    linesCutPoints.set(line, [line.v0, line.v1]);
  });

  intersections.forEach(intersection => {
    let vertex = intersection.vertex;
    linesCutPoints.get(intersection.lineA).push(vertex);
    linesCutPoints.get(intersection.lineB).push(vertex);
  });

  linesCutPoints.forEach((cutPoints, line) => {
    let sortedCutPoint = cutPoints.sort((a, b) => {
      if (a.x === b.x) return a.y - b.y;
      return a.x - b.x;
    });

    for (let i = 0; i <= cutPoints.length - 2; i++) {
      let splittedLine = Object.assign({}, line);
      line.v0 = cutPoints[i];
      line.v1 = cutPoints[i + 1];
      splittedLines.push(splittedLine);
    }
  });

  return splittedLines;
};
