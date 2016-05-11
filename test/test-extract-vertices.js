let extractVertices = require('../src/extract-vertices');
let assert = require('chai').assert;


describe('extract vertices', function () {
  it('should extract vertices', function () {

    var lines = [
      {v0: {x: 10, y: 10}, v1: {x: 0, y: 0}},
      {v0: {x: 10, y: 0}, v1: {x: 0, y: 10}}
    ];

    var expected = [
      {x: 10, y: 10},
      {x: 0, y: 0},
      {x: 10, y: 0},
      {x: 0, y: 10}
    ];

    let result = extractVertices(lines);

    assert.sameDeepMembers(result, expected);

  });
});
