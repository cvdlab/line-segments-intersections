let fs = require('fs');

module.exports = function lines2svg(lines, intersections, filename) {

  let fd = fs.openSync(filename, 'w');

  fs.writeSync(fd, '<?xml version="1.0" standalone="yes"?>\n');
  fs.writeSync(fd, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="10000" width="10000" >\n');

  lines.forEach(segment => {
    fs.writeSync(fd, '<line x1="' + segment.v0.x + '" y1="' + segment.v0.y + '" x2="' + segment.v1.x + '" y2="' + segment.v1.y + '" stroke-width="1" stroke="#ddd" />\n');
  });

  intersections.forEach(intersection => {
    fs.writeSync(fd, '<circle r="2" cx="' + intersection.vertex.x + '" cy="' + intersection.vertex.y + '" fill="red" />\n');
  });

  fs.writeSync(fd, "</svg>");
  fs.closeSync(fd);
};
