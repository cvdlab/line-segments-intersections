let extractVertices = require('../src/sort-unique-vertices');
let assert = require('chai').assert;


describe('extract vertices', function () {
  it('should extract vertices', function () {

    var lines = [
      {x: 10, y: 10},
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 0, y: 10},
      {x: 10, y: 10}
    ];

    var expected = [
      {x: 0, y: 0},
      {x: 0, y: 10},
      {x: 10, y: 0},
      {x: 10, y: 10}
    ];

    let result = extractVertices(lines);

    assert.deepEqual(result, expected);

  });
});
