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
