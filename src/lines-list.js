let intersect = require('./intersect');

function calculateLinePosition(sweepLine, line) {
  let sl = {id: "sl", v0: {x: sweepLine, y: Number.MIN_SAFE_INTEGER}, v1: {x: sweepLine, y: Number.MAX_SAFE_INTEGER}};
  return intersect(sl, line).y;
}

class LinesList {
  constructor() {
    this.lines = [];
  }

  getLine(position) {
    if (0 <= position && position < this.lines.length)
      return this.lines[position];
    else
      return false;
  }

  getPrevLine(position) {
    return this.getLine(position - 1);
  }

  getNextLine(position) {
    return this.getLine(position + 1);
  }

  add(line, sweepLine) {
    let comparator = function(a, b) {
      let aPosition = calculateLinePosition(sweepLine, a);
      let bPosition = calculateLinePosition(sweepLine, b);

      return (aPosition <= bPosition) ? 1 : -1;
    };

    this.lines.push(line);
    this.lines.sort(comparator);

    return this.search(line);
  }

  remove(line, sweepLine) {
    let lines = this.lines;
    let pos = this.search(line);

    lines.splice(pos, 1);

    return pos;
  }

  swap(lineA, lineB, sweepLine) {
    let comparator = function(a, b) {
      let aPosition = calculateLinePosition(sweepLine, a);
      let bPosition = calculateLinePosition(sweepLine, b);

      return (aPosition <= bPosition) ? 1 : -1;
    };

    let posA = this.search(lineA);
    let posB = this.search(lineB);

    this.lines.sort(comparator);

    posA = this.search(lineA);
    posB = this.search(lineB);

    return [posA, posB];
  }

  search(searchedLine) {
    return this.lines.indexOf(searchedLine)
  }

  toString() {
    return this.lines.map(line => {
      return `${line.id}`;
    }).join(',');
  }
}

module.exports = LinesList;
