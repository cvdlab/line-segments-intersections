class EventsQueue {
  constructor() {
    this.events = [];
    this.current = 0;
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
    if(this.current >= this.events.length) return false;

    let event = this.events[this.current];
    this.current++;
    return event;
  }

  reset() {
    this.current = 0;
  }

  enqueueEvent(event) {
    let events = this.events;
    let vertex = event.vertex;
    let pos = 0;

    let stopCondition = (pos) => {
      let curVertex = events[pos].vertex;
      return curVertex.x < vertex.x || curVertex.x === vertex.x && curVertex.y < vertex.y
    };

    while (pos < events.length && stopCondition(pos)) {
      pos++;
    }

    //console.log(pos);

    events.splice(pos, 0, event);
    return pos;
  }
}

EventsQueue.ADD = 'ADD';
EventsQueue.REMOVE = 'REMOVE';
EventsQueue.SWAP = 'SWAP';

module.exports = EventsQueue;
