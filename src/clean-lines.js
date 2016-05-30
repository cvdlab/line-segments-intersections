let Graph = require("./graph");

module.exports = function cleanLines(lines) {

  let uniqueVertices = [];

  let vertexIndex = vertex => {
    let index = uniqueVertices.findIndex(v => (v.x === vertex.x) && (v.y === vertex.y));
    if (index >= 0) return index;
    uniqueVertices.push(vertex);
    return uniqueVertices.length - 1;
  };

  linesWithIndexedVertices = lines.map(line => {
    let index0 = vertexIndex(line.v0);
    let index1 = vertexIndex(line.v1);
    return Object.assign({}, line, {v0: index0, v1: index1});
  });

  let g = new Graph(linesWithIndexedVertices.length * 2);

  linesWithIndexedVertices.forEach(line => {
    g.addEdge(line.v0, line.v1);
    g.addEdge(line.v1, line.v0);
  });

  g.BCC();

  console.log(g.subgraphs)
  console.log(uniqueVertices)

  let acceptedEdges = g.subgraphs
    .filter(subgraph => subgraph.length > 2)
    .reduce((a, b) => a.concat(b), []);

  let acceptedLines = lines
    .filter(line => {
      let index0 = vertexIndex(line.v0);
      let index1 = vertexIndex(line.v1);

      return acceptedEdges.some(edge =>
        (edge.u === index0 && edge.v === index1)
        ||
        (edge.v === index0 && edge.u === index1)
      );
    });

  return acceptedLines;

};
