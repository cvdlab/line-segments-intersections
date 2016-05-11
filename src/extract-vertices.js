module.exports = function (lines) {
  let vertices = [];
  lines.forEach(line => {
    vertices.push(line.v0, line.v1);
  });
  return vertices;
};
