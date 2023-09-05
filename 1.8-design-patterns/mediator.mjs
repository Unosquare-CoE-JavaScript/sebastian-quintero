import { strictEqual } from "node:assert";

class EventBroker {
  constructor() {
    this._handlers = new Map();
    this._count = 0;
  }

  subscribe(handler) {
    this._handlers.set(this._count, handler);
    return this._count++;
  }

  unsubscribe(id) {
    this._handlers.delete(this._count);
  }

  fire(source, args) {
    this._handlers.forEach((handler) => {
      handler(source, args);
    });
  }
}

class Participant {
  constructor(system) {
    this._system = system;
    this._system.addParticipant(this);
    this.value = 0;
  }

  say(value) {
    this._system.broadcast(this, value);
  }

  onMessage(value) {
    this.value += value;
  }
}

class System {
  constructor() {
    this._broker = new EventBroker();
    this._participants = [];
  }

  addParticipant(participant) {
    this._participants.push(participant);
    this._broker.subscribe((source, value) => {
      if (source === participant) {
        return;
      }

      participant.onMessage(value);
    });
  }

  broadcast(source, value) {
    this._broker.fire(source, value);
  }
}

const sytem = new System();
const participant1 = new Participant(sytem);
const participant2 = new Participant(sytem);

strictEqual(participant1.value, 0);
strictEqual(participant2.value, 0);

participant1.say(3);
strictEqual(participant1.value, 0);
strictEqual(participant2.value, 3);

participant2.say(2);
strictEqual(participant1.value, 2);
strictEqual(participant2.value, 3);
