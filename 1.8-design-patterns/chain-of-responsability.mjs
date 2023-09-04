import { strictEqual } from "node:assert";

class GameEventBroker {
  constructor() {
    this._handlers = new Map();
    this._count = 0;
  }

  subscribe(handler) {
    this._handlers.set(++this._count, handler);
  }

  fire(source, args) {
    this._handlers.forEach(function (handler) {
      handler(source, args);
    });
  }
}

const GameEventTopic = Object.freeze({
  ATTACK: 1,
  DEFENSE: 2,
});

class GameQuery {
  constructor(entity, topic, value) {
    this._entity = entity;
    this.topic = topic;
    this.value = value;
  }
}

class Game {
  constructor() {
    this.goblins = [];
    this.broker = new GameEventBroker();
  }

  performQuery(source, query) {
    this.broker.fire(source, query);
  }

  addGoblin(goblin) {
    this.goblins.push(goblin);
    return this;
  }
}

class Goblin {
  constructor(game) {
    this._baseAttack = 1;
    this._baseDefense = 1;
    this._game = game;
    this._game.addGoblin(this);
  }

  get attack() {
    const query = new GameQuery(this, GameEventTopic.ATTACK, this._baseAttack);
    this._game.performQuery(this, query);
    return query.value;
  }

  get defense() {
    const query = new GameQuery(this, GameEventTopic.DEFENSE, this._baseAttack);
    this._game.performQuery(this, query);
    return query.value;
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    super(game);
    this._baseDefense = 3;
    this._baseAttack = 3;
  }
}

class CreatureModifier {
  constructor(game) {
    this._game = game;
    this._game.broker.subscribe(this.handle.bind(this));
  }

  handle(source, query) {}
}

class GoblinAttackModifier extends CreatureModifier {
  handle(source, query) {
    if (query.topic !== GameEventTopic.ATTACK) {
      return;
    }

    if (!(source instanceof Goblin)) {
      return;
    }

    if (source instanceof GoblinKing) {
      return;
    }

    this._game.goblins.forEach((entity) => {
      if (entity === source) {
        return;
      }

      if (!(entity instanceof GoblinKing)) {
        return;
      }

      query.value += 1;
    });
  }
}

class GoblinDefenseModifier extends CreatureModifier {
  handle(source, query) {
    if (query.topic !== GameEventTopic.DEFENSE) {
      return;
    }

    if (!(source instanceof Goblin)) {
      return;
    }

    this._game.goblins.forEach((entity) => {
      if (entity === source) {
        return;
      }

      if (!(entity instanceof Goblin)) {
        return;
      }

      query.value += 1;
    });
  }
}

let game = new Game();

let goblinAttackModifier = new GoblinAttackModifier(game);
let goblinDefenseModifier = new GoblinDefenseModifier(game);

let goblin1 = new Goblin(game);

strictEqual(goblin1.attack, 1);
strictEqual(goblin1.defense, 1);

let goblinKing = new GoblinKing(game);

strictEqual(goblin1.attack, 2);
strictEqual(goblin1.defense, 2);
strictEqual(goblinKing.attack, 3);
strictEqual(goblinKing.defense, 4);

let goblin2 = new Goblin(game);

strictEqual(goblin1.attack, 2);
strictEqual(goblin1.defense, 3);
strictEqual(goblinKing.attack, 3);
strictEqual(goblinKing.defense, 5);
strictEqual(goblin2.attack, 2);
strictEqual(goblin2.defense, 3);
