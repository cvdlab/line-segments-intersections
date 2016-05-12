let intersect = require('./intersect');
let LinesList = require('./lines-list');
let EventsQueue = require('./events-queue');


const A = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}};
const B = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}};
const C = {v0: {x: 5, y: 3}, v1: {x: 10, y: 7}};
const D = {v0: {x: 15, y: 3}, v1: {x: 10, y: 7}};

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


//var eq = new EventsQueue();
//
//eq.enqueueAddEvent(C);
//eq.enqueueAddEvent(B);
//console.log(eq.next());
//eq.enqueueAddEvent(A);
//console.log(eq.next());
//console.log(eq.next());
//console.log(eq.next());


//console.log(eq.events);


let bentleyOttmann = (lines) => {

  lines = rearrangeLinesVertices(lines);
  let eq = new EventsQueue();
  let sl = new LinesList(linesComparator);
  let intersections = [];

  lines.forEach(line => {
    eq.enqueueAddEvent(line);
    eq.enqueueRemoveEvent(line);
  });

  let event;

  while (event = eq.next()) {
    let pos;
    let lineAbove = false, lineBelow = false, intersection = false;

    console.log(event);

    switch (event.type) {

      case EventsQueue.ADD:
        pos = sl.add(event.line);
        lineAbove = sl.getLine(pos - 1);
        if (lineAbove) {
          intersection = intersect(event.line, lineAbove);
          if (intersection) intersections.push(intersection);
        }

        lineBelow = sl.getLine(pos + 1);
        if (lineBelow) {
          intersection = intersect(event.line, lineBelow);
          if (intersection) eq.enqueueSwapEvent(event.line, lineBelow, intersection);

        }
        break;

      case EventsQueue.REMOVE:
        pos = sl.remove(event.line);
        lineAbove = sl.getLine(pos - 1);
        lineBelow = sl.getLine(pos);
        if (lineAbove && lineBelow) {
          intersection = intersect(lineAbove, lineBelow);
          if (intersection) eq.enqueueSwapEvent(lineAbove, lineBelow, intersection);
        }
        break;

      case EventsQueue.SWAP:
        intersections.push(event.vertex);
        pos = sl.swap(event.lineA, event.lineB);
        lineAbove = sl.getLine(pos[0] - 1);
        lineBelow = sl.getLine(pos[1] + 1);
        if (lineAbove) {
          intersection = intersect(event.lineA, lineAbove);
          if (intersection) eq.enqueueSwapEvent(event.lineA, lineAbove, intersection);
        }
        if (lineBelow) {
          intersection = intersect(event.lineB, lineBelow);
          if (intersection) eq.enqueueSwapEvent(event.lineB, lineBelow, intersection);
        }
        break;

      default:
        throw new Error('unrecognized type');
    }

  }


  console.log('intersections', intersections);
  return intersections;

  //console.log(eq);
  //console.log(lines);


};


bentleyOttmann([
  A, B, C
]);


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



