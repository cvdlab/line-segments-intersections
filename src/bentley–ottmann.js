let intersect = require('./intersect');
let LinesList = require('./lines-list');
let EventsQueue = require('./events-queue');
let Intersections = require('./intersections');


const A = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}, id: 'A'};
const B = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}, id: 'B'};
const C = {v0: {x: 5, y: 3}, v1: {x: 10, y: 7}, id: 'C'};
const D = {v0: {x: 15, y: 3}, v1: {x: 10, y: 7}, id: 'D'};


const E = {v0: {x: 0, y: 0}, v1: {x: 10, y: 10}, id: 'E'};
const F = {v0: {x: 0, y: 10}, v1: {x: 10, y: 0}, id: 'F'};
const G = {v0: {x: 0, y: 5}, v1: {x: 10, y: 5}, id: 'G'};
const H = {v0: {x: 5, y: 0}, v1: {x: 5, y: 10}, id: 'H'};


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


let bentleyOttmann = (lines) => {

  lines = rearrangeLinesVertices(lines);
  let eq = new EventsQueue();
  let sl = new LinesList(linesComparator);
  let intersections = new Intersections();

  lines.forEach(line => {
    eq.enqueueAddEvent(line);
    eq.enqueueRemoveEvent(line);
  });

  let event;

  while (event = eq.next()) {
    let pos;
    let lineAbove = false, lineBelow = false, intersection = false;

    //console.log(event);

    switch (event.type) {

      case EventsQueue.ADD:
        pos = sl.add(event.line);
        lineAbove = sl.getLine(pos - 1);
        if (lineAbove) {
          intersection = intersect(event.line, lineAbove);
          if (intersection && intersections.safeAddIntersection(intersection, event.line, lineAbove)) {
            eq.enqueueSwapEvent(event.line, lineAbove, intersection);
          }
        }

        lineBelow = sl.getLine(pos + 1);
        if (lineBelow) {
          intersection = intersect(event.line, lineBelow);
          if (intersection && intersections.safeAddIntersection(intersection, event.line, lineBelow)) {
            eq.enqueueSwapEvent(event.line, lineBelow, intersection);
          }

        }
        break;

      case EventsQueue.REMOVE:
        pos = sl.remove(event.line);
        lineAbove = sl.getLine(pos - 1);
        lineBelow = sl.getLine(pos);
        if (lineAbove && lineBelow) {
          intersection = intersect(lineAbove, lineBelow);
          if (intersection && intersections.safeAddIntersection(intersection, lineAbove, lineBelow)) {
            eq.enqueueSwapEvent(lineAbove, lineBelow, intersection);
          }
        }
        break;

      case EventsQueue.SWAP:
        pos = sl.swap(event.lineA, event.lineB);
        lineAbove = sl.getLine(pos[1] - 1);
        lineBelow = sl.getLine(pos[0] + 1);
        if (lineAbove) {
          intersection = intersect(event.lineA, lineAbove);
          if (intersection && intersections.safeAddIntersection(intersection, event.lineA, lineAbove)) {
            eq.enqueueSwapEvent(event.lineA, lineAbove, intersection);
          }
        }
        if (lineBelow) {
          intersection = intersect(event.lineB, lineBelow);
          if (intersection && intersections.safeAddIntersection(intersection, event.lineB, lineBelow)) {
            eq.enqueueSwapEvent(event.lineB, lineBelow, intersection);
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


  //console.log('intersections', intersections);
  return intersections.intersections;

  //console.log(eq);
  //console.log(lines);


};

let trivialInserctions = (lines) => {
  let intersections = [];
  lines.forEach(lineA => {
    lines.forEach(lineB => {

      let intersection = intersect(lineA, lineB);
      if (intersection) intersections.push(intersection);

    })
  });
  return intersections;
};

//console.log('bentley-ottman', bentleyOttmann([
//  E, F, G, H
//]));

//console.log('trivial-intersections', trivialInserctions([
//  A, B, C, D
//]));

//let C1 = rearrangeLinesVertices([C])[0];
//let D1 = rearrangeLinesVertices([D])[0];
//
//var eq = new EventsQueue();
//eq.enqueueAddEvent(C1);
//eq.enqueueRemoveEvent(C1);
//eq.enqueueAddEvent(D1);
//eq.enqueueRemoveEvent(D1);
//console.log(eq.events);


module.exports = bentleyOttmann;
