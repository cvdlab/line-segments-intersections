let fs = require('fs');

module.exports = function lines2svg(lines, intersections, filename, showPoints) {

  let width = Number.NEGATIVE_INFINITY;
  let height = Number.NEGATIVE_INFINITY;

  lines.forEach(line => {
    width = Math.max(width, line.v0.x, line.v1.x);
    height = Math.max(height, line.v0.y, line.v1.y);
  });

  let fd = fs.openSync(filename, 'w');

  fs.writeSync(fd, '<?xml version="1.0" standalone="yes"?>\n');
  fs.writeSync(fd, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (height + 50) + '" width="' + (width + 100) + '" >\n');
  fs.writeSync(fd, '<g transform="translate(0, ' + (height + 50) + ')" >\n');
  fs.writeSync(fd, '<g transform="scale(1,-1)" >\n');

  lines.forEach(segment => {
    fs.writeSync(fd, '<line x1="' + segment.v0.x + '" y1="' + segment.v0.y + '" x2="' + segment.v1.x + '" y2="' + segment.v1.y + '" stroke-width="1" stroke="#ddd" />\n');
  });

  intersections.forEach(intersection => {
    fs.writeSync(fd, '<g transform="translate(' + intersection.vertex.x + ',' + intersection.vertex.y + ')">\n');
    fs.writeSync(fd, '<circle r="2" cx="0" cy="0" fill="red" />\n');
    if(showPoints) {
      fs.writeSync(fd, '<text x="0" y="0" font-family="Verdana" font-size="6" fill="red" transform="scale(1,-1)" >' +
        Number(intersection.vertex.x).toFixed(2) + ', ' +
        Number(intersection.vertex.y).toFixed(2) + '</text>\n');
    }
    fs.writeSync(fd, '</g>\n');
  });

  lines.forEach(line => {
    fs.writeSync(fd, '<g transform="translate(' + line.v0.x + ',' + line.v0.y + ')">\n');
    fs.writeSync(fd, '<circle r="1" cx="0" cy="0" fill="black" />\n');
    if(showPoints) {
      fs.writeSync(fd, '<text x="0" y="0" font-family="Verdana" font-size="6" transform="scale(1,-1)" >' +
        '{' + line.id + '}' +
        Number(line.v0.x).toFixed(2) + ', ' +
        Number(line.v0.y).toFixed(2) + '</text>\n');
    }
    fs.writeSync(fd, '</g>\n');

    fs.writeSync(fd, '<g transform="translate(' + line.v1.x + ',' + line.v1.y + ')">\n');
    fs.writeSync(fd, '<circle r="1" cx="0" cy="0" fill="black" />\n');
    if(showPoints) {
      fs.writeSync(fd, '<text x="0" y="0" font-family="Verdana" font-size="6" transform="scale(1,-1)" >' +
        '{' + line.id + '}' +
        Number(line.v1.x).toFixed(2) + ', ' +
        Number(line.v1.y).toFixed(2) + '</text>\n');
    }
    fs.writeSync(fd, '</g>\n');
  });

  fs.writeSync(fd, "</g>");
  fs.writeSync(fd, "</g>");
  fs.writeSync(fd, "</svg>");
  fs.closeSync(fd);
};
