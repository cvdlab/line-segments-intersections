let linesGenerator = function(count, width, height) {

  let segments = [];

  for (let i = 1; i <= count; i++) {

    let x1 = Math.random() * width;
    let x2 = Math.random() * width;
    let y1 = Math.random() * height;
    let y2 = Math.random() * height;

    segments.push({
      id: i,
      v0: {x: x1, y: y1},
      v1: {x: x2, y: y2}
    });
  }

  return segments;
};

module.exports = linesGenerator;
