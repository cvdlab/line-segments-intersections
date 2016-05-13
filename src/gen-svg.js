let bentleyOttmann = require('./bentley–ottmann');
let fs = require('fs');
let path = require('path');


function generateRandomSegments(count, width, height) {

  let segments = [];

  for (let i = 1; i <= count; i++) {

    let x1 = Math.random() * width;
    let x2 = Math.random() * width;
    let y1 = Math.random() * height;
    let y2 = Math.random() * height;

    segments.push({
      v0: {x: x1, y: y1},
      v1: {x: x2, y: y2}
    });
  }

  let intersections = bentleyOttmann(segments);

  console.log(segments);
  console.log(intersections);


  fd = fs.openSync(path.join(process.cwd(), 'test.svg'), 'w');

  fs.writeSync(fd, '<?xml version="1.0" standalone="yes"?>\n');
  fs.writeSync(fd, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + height + '" width="' + width + '" >\n');


  segments.forEach(segment => {
    fs.writeSync(fd, '<line x1="' + segment.v0.x + '" y1="' + segment.v0.y + '" x2="' + segment.v1.x + '" y2="' + segment.v1.y + '" stroke-width="1" stroke="#ddd" />\n');
  });

  intersections.forEach(intersection => {
    fs.writeSync(fd, '<circle r="2" cx="' + intersection.vertex.x + '" cy="' + intersection.vertex.y + '" fill="red" />\n');
  });

  fs.writeSync(fd, "</svg>");
  fs.closeSync(fd);
}


generateRandomSegments(100, 500, 500);
