import { strictEqual } from "node:assert";

class Bird {
  constructor(age) {
    this._age = age;
  }

  set age(value) {
    this._age = value;
  }

  fly() {
    return this._age < 10 ? "flying" : "too old";
  }
}

class Lizard {
  constructor(age) {
    this._age = age;
  }

  set age(value) {
    this._age = value;
  }

  crawl() {
    return this._age > 1 ? "crawling" : "too young";
  }
}

class Dragon {
  constructor(bird, lizard, age) {
    this._bird = bird;
    this._lizard = lizard;

    this._age = age;
    this._bird.age = age;
    this._lizard.age = age;
  }

  fly() {
    return this._bird.fly();
  }

  crawl() {
    return this._lizard.crawl();
  }
}

const bird = new Bird(0);
const lizard = new Lizard(0);
const dragon = new Dragon(bird, lizard, 5);

strictEqual(dragon.fly(), "flying");
strictEqual(dragon.crawl(), "crawling");
