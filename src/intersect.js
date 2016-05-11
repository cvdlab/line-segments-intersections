var lineIntersect = require('line-intersect');

let intersect = function (line1, line2) {

  var result = lineIntersect.checkIntersection(
    line1.v0.x, line1.v0.y, line1.v1.x, line1.v1.y,
    line2.v0.x, line2.v0.y, line2.v1.x, line2.v1.y
  );

  if (result.type === 'intersecting')
    return result.point;
  else
    return false;
};

module.exports = intersect;
