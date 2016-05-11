let comparator = (a, b) => {
  if (a.x === b.x ) {
    return a.y < b.y ? -1 : 1;
  }else{
    return a.x < b.x ? -1 : 1;
  }
};

let equals = (a, b) => {
  return a.x === b.x && a.y === b.y;
};

module.exports = function (vertices) {

  let sortedVertices = vertices.sort(comparator);

  var uniqueVertices = [sortedVertices[0]];
  for (var i = 1; i < sortedVertices.length; i++) {
    if (! equals(sortedVertices[i - 1], sortedVertices[i])) {
      uniqueVertices.push(sortedVertices[i]);
    }
  }

  return uniqueVertices;
};
