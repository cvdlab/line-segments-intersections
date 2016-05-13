let intersect = require('./intersect');

let trivialInserctions = (lines) => {
  let intersections = [];
  lines.forEach(lineA => {
    lines.forEach(lineB => {

      let intersection = intersect(lineA, lineB);
      if (intersection) intersections.push({
        vertex: intersection,
        lineA,
        lineB
      });

    })
  });
  return intersections;
};

module.exports = trivialInserctions;
