let LinesList = require('../src/lines-list');


let comparator = (a, b) => {





  if (a.x === b.x ) {
    return a.y < b.y ? -1 : 1;
  }else{
    return a.x < b.x ? -1 : 1;
  }


};

let linesList = new LinesList(comparator);


linesList.add({p0: {x: 0, y:10}, p1:{}})



console.log(linesList);
