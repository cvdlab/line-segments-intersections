let fs = require('fs');

module.exports = function lines2json(lines, intersections, filename) {

  let fd = fs.openSync(filename, 'w');
  let output = {
    lines, intersections
  };
  fs.writeSync(fd, JSON.stringify(output));
  fs.closeSync(fd);
};
