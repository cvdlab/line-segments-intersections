let intersect = require('../src/intersect');
let assert = require('assert');


describe('intersections', function () {
  it('should return intersection', function () {

    var line1 = {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}};
    var line2 = {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}};
    var expected = {x: 5, y:5};

    let result = intersect(line1, line2);

    assert.deepEqual(result, expected);

  });
});
