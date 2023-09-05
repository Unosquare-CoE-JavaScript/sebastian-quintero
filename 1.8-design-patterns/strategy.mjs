import {} from "node:assert";

class Creature {
  constructor(attack, health, alive) {
    this.attack = attack;
    this.health = health;
    this.alive = alive;
  }
}

class DamangeStrategy {
  constructor() {}

  damange(creature) {}
}

class ConstantDamangeStrategy extends DamangeStrategy {
  damange(creature) {
    creature.health -= 1;
  }
}

class GrowingDamangeStrategy extends DamangeStrategy {
  constructor() {
    super();
    this.impact = 1;
  }

  damange(creature) {
    creature.health -= this.impact;
    this.impact++;
  }
}

class Game {
  constructor(damangeStrategy) {
    this._damangeStrategy = damangeStrategy;
  }

  springTrapOn(creature) {
    this._damangeStrategy.damange(creature);

    if (creature.health <= 0) {
      creature.alive = false;
    }

    return creature.alive;
  }
}
