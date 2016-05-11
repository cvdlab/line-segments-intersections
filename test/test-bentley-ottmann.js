let intersections = require('../src/bentley–ottmann');
let assert = require('chai').assert;


describe('cross intersection', function () {
  it('test trought cross.json', function () {
    let data = require('./fixture/cross.json');

    let result = intersections(data.input);
    assert.deepEqual(result, data.expected);

  });
});
