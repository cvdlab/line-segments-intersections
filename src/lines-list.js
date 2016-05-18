
function calculateLinePosition(sweepLine, line) {

  let m = (line.v1.y - line.v0.y) / (line.v1.x - line.v0.x);

  return (m * (sweepLine - line.v0.x)) + line.v0.y;
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

    let lines = this.lines;
    let newLinePosition = line.v0.y;
    let pos = 0;

    while (pos < lines.length) {
      let currentLine = lines[pos];
      let currentLinePosition = calculateLinePosition(sweepLine, currentLine);

      if (currentLinePosition > newLinePosition) {
        pos++
      } else {
        break;
      }
    }

    lines.splice(pos, 0, line);
    return pos;
  }

  remove(line, sweepLine) {
    let lines = this.lines;
    let pos = this.search(line);

    lines.splice(pos, 1);

    return pos;
  }

  swap(lineA, lineB, sweepLine) {
    let posA = this.search(lineA);
    let posB = this.search(lineB);

    this.lines[posA] = lineB;
    this.lines[posB] = lineA;

    return [posB, posA];
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
