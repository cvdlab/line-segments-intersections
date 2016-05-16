class EventsQueue {
  constructor() {
    this.events = [];
  }

  enqueueAddEvent(line) {
    return this.enqueueEvent({
      type: EventsQueue.ADD,
      line,
      vertex: line.v0
    });
  }

  enqueueRemoveEvent(line) {
    return this.enqueueEvent({
      type: EventsQueue.REMOVE,
      line,
      vertex: line.v1
    });
  }

  enqueueSwapEvent(lineA, lineB, intersection) {
    return this.enqueueEvent({
      type: EventsQueue.SWAP,
      lineA,
      lineB,
      vertex: intersection
    });
  }

  next() {
    if(this.events.length < 1) return false;

    return this.events.shift();
  }

  enqueueEvent(event) {
    let events = this.events;
    let vertex = event.vertex;
    let pos = 0;

    let stopCondition = (pos) => {
      let curVertex = events[pos].vertex;
      return curVertex.x < vertex.x || (curVertex.x === vertex.x && curVertex.y <= vertex.y)
    };

    while (pos < events.length && stopCondition(pos)) {
      pos++;
    }

    //console.log(pos);

    events.splice(pos, 0, event);
    return pos;
  }

  toString(){
    return this.events.map(event => {
      let {type, vertex} = event;
      let linesID = (event.line) ? event.line.id : event.lineA.id + "-" + event.lineB.id;
      return `${type}{${linesID}}${Number(vertex.x).toFixed(2)}:${Number(vertex.y).toFixed(2)}`;
    }).join(',');
  }
}

EventsQueue.ADD = 'ADD';
EventsQueue.REMOVE = 'REMOVE';
EventsQueue.SWAP = 'SWAP';

module.exports = EventsQueue;
