var intersect = require('./intersect');


const A = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}};
const B = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}};
const C = {v0: {x: 5, y: 3}, v1: {x: 10, y: 7}};

let verticesComparator = (a, b) => {
  if (a.x === b.x) {
    return a.y < b.y ? 1 : -1;
  } else {
    return a.x < b.x ? 1 : -1;
  }
};

//console.log(verticesComparator(A.v0, A.v1));
//console.log(verticesComparator(A.v0, B.v0));


let rearrangeLinesVertices = function (lines) {
  return lines.map(line => {
    let {v0, v1} = line;
    if (verticesComparator(v0, v1) < 0) {
      line.v0 = v1;
      line.v1 = v0;
    }
    return line;
  });
};


let linesComparator = (a, b) => {
  return verticesComparator(a.v0, b.v1);
};


//console.log(rearrangeLinesVertices([A, B]));

class LinesList {
  constructor(comparator) {
    this.lines = [];
    this.comparator = comparator;
  }

  getLine(position) {
    return this.lines[position];
  }

  add(line) {
    let comparator = this.comparator;
    let lines = this.lines;
    let pos = 0;

    while (pos < lines.length) {
      let cur = lines[pos];
      if (comparator(line, cur) > 0)
        pos++;
      else
        break;
    }

    lines.splice(pos, 0, line);

    return pos;
  }

  remove(line) {
    let lines = this.lines;
    let pos = this.search(line);

    lines.splice(pos, 1);

    return pos;
  }

  swap(lineA, lineB) {
    let lines = this.lines;
    let posA = this.search(lineA);
    let posB = this.search(lineB);

    lines[posA] = lineB;
    lines[posB] = lineA;

    return [posA, posB];
  }

  search(searchedLine) {
    return this.lines.indexOf(searchedLine)
  }
}

//
//var sl = new LinesList(linesComparator);
//sl.add(A);
//sl.add(B);
//sl.add(C);
//
//console.log(sl.lines);
//
//sl.swap(A, C);
//
//console.log(sl.lines);
//



//
//
//
//
//
//
//
//
//console.log(22);
//
//
////
//let swapLinesVertices = function(lines){
//  return lines.map(line => {
//
//
//
//
//
//
//  })
//};
//
//
//
//
//
//
//
//
//
//
//
////
////
////
////module.exports = function (lines) {
////
////
////
////
////  let eq = extractVertices(lines);
//
//
//
//  return [{x: 5, y: 5}];
//
//};
