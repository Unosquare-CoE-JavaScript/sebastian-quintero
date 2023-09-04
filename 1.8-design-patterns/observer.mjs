import { strictEqual } from "node:assert";

const GameEventTopic = Object.freeze({
  ENTERS: 0,
  LEAVES: 1,
});

class GameEvent {
  constructor() {
    this._handlers = new Map();
    this._count = 0;
  }

  subscribe(handler) {
    this._handlers.set(this._count, handler);
    return this._count++;
  }

  unsubscribe(id) {
    this._handlers.delete(id);
  }

  fire(source, args) {
    this._handlers.forEach((handler) => handler(source, args));
  }
}

class Game {
  constructor() {
    this._rats = [];
    this.events = new GameEvent();
  }

  get length() {
    return this._rats.length;
  }

  addRat(rat) {
    this._rats.push(rat);
    this.events.fire(rat, { topic: GameEventTopic.ENTERS });
  }

  removeRat(rat) {
    this.events.fire(rat, { topic: GameEventTopic.LEAVES });
    return this._rats.splice(this._rats.indexOf(rat), 1);
  }
}

class Rat {
  constructor(game) {
    this._game = game;
    this._game.addRat(this);
    this._id = this._game.events.subscribe(this._handle.bind(this));
    this._attack = this._game.length;
  }

  get attack() {
    return this._attack;
  }

  _handle(source, args) {
    if (source === this) {
      return;
    }

    if (args.topic === GameEventTopic.ENTERS) {
      this._attack++;
    }

    if (args.topic === GameEventTopic.LEAVES) {
      this._attack--;
    }
  }

  die() {
    this._game.events.unsubscribe(this._id);
    this._game.removeRat(this);
  }
}

let game = new Game();

let rat1 = new Rat(game);
strictEqual(rat1.attack, 1);

let rat2 = new Rat(game);
strictEqual(rat1.attack, 2);
strictEqual(rat2.attack, 2);

rat2.die();
strictEqual(rat1.attack, 1);
