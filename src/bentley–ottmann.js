let intersect = require('./intersect');
let LinesList = require('./lines-list');
let EventsQueue = require('./events-queue');
let Intersections = require('./intersections');


const A = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}, id: 'A'};
const B = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}, id: 'B'};
const C = {v0: {x: 5, y: 3}, v1: {x: 10, y: 7}, id: 'C'};
const D = {v0: {x: 15, y: 3}, v1: {x: 10, y: 7}, id: 'D'};


//const E = {v0: {x: 0, y: 0}, v1: {x: 10, y: 10}, id: 'E'};
//const F = {v0: {x: 0, y: 10}, v1: {x: 10, y: 0}, id: 'F'};
//const G = {v0: {x: 0, y: 5}, v1: {x: 10, y: 5}, id: 'G'};
//const H = {v0: {x: 5, y: 0}, v1: {x: 5, y: 10}, id: 'H'};

//const E = {id: 1, v0: {x: 13.653395331786445, y: 208.31890628317518}, v1: {x: 109.52539130869809, y: 364.80744026924594}};
//const F = {id: 2, v0: {x: 334.6150944056223, y: 111.34981460513205}, v1: {x: 392.9346924380188, y: 348.0706144689023}};
//const G = {id:3, v0: {x: 295.13611742917755, y: 89.18707147512094}, v1: {x: 331.63228434871075, y: 200.22076656846576}};
//const H = {id:4, v0: {x: 163.71390212489612, y: 287.40037705294594}, v1: {x: 375.3827979715527, y: 201.30879062231634}};
//const I = {id:5, v0: {x: 95.78262077463052, y: 174.15883486215455}, v1: {x: 495.68337467785204, y: 131.10146520866738}};

const E = {id: 1, v0: {x: 89.01003629659942, y:50.84731944907861 }, v1: {x: 213.69775431906257, y:312.34784967416516 }};
const F = {id: 2, v0: {x: 146.0544926758024, y: 73.50462696403804}, v1: {x: 361.7065258372355, y: 458.8520183299233}};
const G = {id: 3, v0: {x: 383.56205801744915, y: 328.9974359034239}, v1: {x: 452.80240806011994, y: 411.8122367129068 }};
const H = {id: 4, v0:{x:108.92707603727425, y:95.13064569196628},v1:{x:241.7521642842455, y:497.9883960035628}};
const I = {id: 5, v0: {x:126.01327686688235, y:219.23409454477795},v1:{x:187.47404399932944, y:194.6360931908001}};




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
  let sl = new LinesList();
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

console.log('bentley-ottman', bentleyOttmann([
  E, F, G, H, I
]));

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
