let intersect = require('./intersect');
let LinesList = require('./lines-list');
let EventsQueue = require('./events-queue');
let Intersections = require('./intersections');

let verticesComparator = (a, b) => {
  if (a.x === b.x) {
    return a.y < b.y ? 1 : -1;
  } else {
    return a.x < b.x ? 1 : -1;
  }
};


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

let bentleyOttmann = (lines) => {

  lines = rearrangeLinesVertices(lines);
  let eq = new EventsQueue();
  let sl = new LinesList();
  let intersections = new Intersections();

  lines.forEach(line => {
    eq.enqueueAddEvent(line);
    eq.enqueueRemoveEvent(line);
  });

  console.log('eq', eq.toString());
  console.log('sl', sl.toString());
  console.log('');

  let event;

  while (event = eq.next()) {
    let pos, posA, posB;
    let linePrev = false, lineNext = false, intersection = false;
    let sweepLine = event.vertex.x;

    //console.log(event);

    switch (event.type) {

      case EventsQueue.ADD:
        pos = sl.add(event.line, sweepLine);
        linePrev = sl.getPrevLine(pos);
        if (linePrev) {
          intersection = intersect(event.line, linePrev);
          if (intersection && intersections.safeAddIntersection(intersection, event.line, linePrev)) {
            eq.enqueueSwapEvent(linePrev, event.line, intersection);
          }
        }

        lineNext = sl.getNextLine(pos);
        if (lineNext) {
          intersection = intersect(event.line, lineNext);
          if (intersection && intersections.safeAddIntersection(intersection, event.line, lineNext)) {
            eq.enqueueSwapEvent(event.line, lineNext, intersection);
          }

        }
        break;

      case EventsQueue.REMOVE:
        pos = sl.remove(event.line, sweepLine);
        linePrev = sl.getPrevLine(pos);
        lineNext = sl.getLine(pos); //the old position is now my next position
        if (linePrev && lineNext) {
          intersection = intersect(linePrev, lineNext);
          if (intersection && intersections.safeAddIntersection(intersection, linePrev, lineNext)) {
            eq.enqueueSwapEvent(linePrev, lineNext, intersection);
          }
        }
        break;

      case EventsQueue.SWAP:
        [posA, posB] = sl.swap(event.lineA, event.lineB, sweepLine);
        linePrev = sl.getPrevLine(posB);
        lineNext = sl.getNextLine(posA);

        if (linePrev) {
          intersection = intersect(linePrev, event.lineB);
          if (intersection && intersections.safeAddIntersection(intersection, linePrev, event.lineB)) {
            eq.enqueueSwapEvent(linePrev, event.lineB, intersection);
          }
        }

        if (lineNext) {
          intersection = intersect(event.lineA, lineNext);
          if (intersection && intersections.safeAddIntersection(intersection, event.lineA, lineNext)) {
            eq.enqueueSwapEvent(event.lineA, lineNext, intersection);
          }
        }
        break;

      default:
        throw new Error('unrecognized type');
    }

    console.log('eq', eq.toString());
    console.log('sl', sl.toString());
    console.log('');

  }

  return intersections.intersections;
};

module.exports = bentleyOttmann;
