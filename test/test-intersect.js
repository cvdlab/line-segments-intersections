let intersect = require('../src/intersect');
let assert = require('assert');


describe('intersections', function () {
  it('should return intersection', function () {

    var line1 = {start: {x: 10, y: 10}, end: {x: 0, y: 0}};
    var line2 = {start: {x: 10, y: 0}, end: {x: 0, y: 10}};
    var expected = {x: 5, y:5};

    let result = intersect(line1, line2);

    assert.deepEqual(result, expected);

  });
});
