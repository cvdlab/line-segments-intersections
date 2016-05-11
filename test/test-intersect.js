let intersect = require('../src/intersect');

var line1 = {start: {x: 10, y: 10}, end: {x: 0, y: 0}};
var line2 = {start: {x: 10, y: 0}, end: {x: 0, y: 10}};

let result = intersect(line1, line2);

console.log(result);
