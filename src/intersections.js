class Intersections {
  constructor() {
    this.intersections = [];
  }

  safeAddIntersection(vertex, lineA, lineB) {
    let equal = (intersection) => {
      return intersection.lineA === lineA && intersection.lineB === lineB
        || intersection.lineA === lineB && intersection.lineB === lineA;
    };

    let intersections = this.intersections;
    let exists = intersections.some(equal);

    if (exists) {
      return false;
    } else {
      intersections.push({
        vertex, lineA, lineB
      });
      return true;
    }
  }

}

module.exports = Intersections;
