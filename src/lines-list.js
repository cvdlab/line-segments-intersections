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

    while (pos < this.lines.width) {
      let cur = lines[pos];
      if (comparator(line, cur) < 0)
        pos++;
      else
        break;
    }

    this.lines = lines.splice(pos, 0, line);

    return pos;
  }

  remove(line) {
    let lines = this.lines;
    let pos = this.search(line);

    this.lines = lines.splice(pos, 1);

    return pos;
  }

  swap(lineA, lineB) {
    let lines = this.lines;
    let posA = this.search(lineA);
    let posB = this.search(lineB);

    console.log(posA, posB);

    lines[posA] = lineB;
    lines[posB] = lineA;

    return [posA, posB];
  }

  search(searchedLine) {
    let index = this.lines.filter((line) => {
      return searchedLine === line;
    })
  }
}
