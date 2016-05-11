var lineIntersect = require('line-intersect');

let intersect = function (line1, line2) {

  var result = lineIntersect.checkIntersection(
    line1.start.x, line1.start.y, line1.end.x, line1.end.y,
    line2.start.x, line2.start.y, line2.end.x, line2.end.y
  );

  if (result.type === 'intersecting')
    return result.point;
  else
    return false;
};

module.exports = intersect;
