let intersections = require('../src/bentley–ottmann');
let data = require('./fixture/data.json');

let output = intersections(data);
console.log(output);
