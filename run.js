let bentleyOttmann = require('./src/bentley–ottmann');
let lines2svg = require('./src/lines2svg');
let lines2json = require('./src/lines2json');
let linesGenerator = require('./src/lines-generator');
let path = require('path');
let now = require("performance-now");

//const A = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}, id: 'A'};
//const B = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}, id: 'B'};
//const C = {v0: {x: 5, y: 3}, v1: {x: 10, y: 7}, id: 'C'};
//const D = {v0: {x: 15, y: 3}, v1: {x: 10, y: 7}, id: 'D'};


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

//const A = {id: 1, v0: {x: 63, y: 397}, v1: {x: 955, y: 142}};
//const B = {id: 2, v0: {x: 148, y: 224}, v1: {x: 490, y: 371}};
//const C = {id: 3, v0: {x: 193, y: 285}, v1: {x: 444, y: 303}};
//const D = {id: 4, v0: {x: 103, y: 175}, v1: {x: 276, y: 132}};
//const E = {id: 5, v0: {x: 236, y: 85}, v1: {x: 874, y: 248}};
//const F = {id: 6, v0: {x: 558, y: 183}, v1: {x: 627, y: 122}};



//const A = {id: 1, v0: {x: 0, y: 100}, v1: {x: 150, y: 10}};
//const B = {id: 1, v0: {x: 50, y: 50}, v1: {x: 200, y: 60}};
//const C = {id: 1, v0: {x: 150, y: 30}, v1: {x: 210, y: 80}};


//let lines = linesGenerator(10, 500, 500);
//let lines = [E, F, G, H, I];
let lines = require(path.join(process.cwd(), 'output.json')).lines;
let showPoints = true;

var start = now();
let intersections = bentleyOttmann(lines);
var end = now();

console.log('bentley-ottman', intersections);
console.log('benchmark (ms)', (end - start).toFixed(3));

lines2svg(lines, intersections, path.join(process.cwd(), 'output.svg'), showPoints);
lines2json(lines, intersections, path.join(process.cwd(), 'output.json'));

