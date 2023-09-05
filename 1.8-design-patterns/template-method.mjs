import {} from "node:assert";

class Creature {
  constructor(attack, health) {
    this.attack = attack;
    this.health = health;
  }
}

class CardGame {
  constructor(creatures) {
    this.creatures = creatures;
  }

  combat(creature1index, creature2index) {
    let first = this.creatures[creature1index];
    let second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    let firstAlive = first.health > 0;
    let secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return -1;
    return firstAlive ? creature1index : creature2index;
  }

  hit(attacker, defender) {
    throw new Error("Please implement this in inheritors");
  }
}

class TemporaryCardDamange extends CardGame {
  hit(attacker, defender) {
    if (defender.health < attacker.attack) {
      defender.health -= attacker.attack;
    }
  }
}

class PermanentCardDamange extends CardGame {
  hit(attacker, defender) {
    defender.health -= attacker.attack;
  }
}
