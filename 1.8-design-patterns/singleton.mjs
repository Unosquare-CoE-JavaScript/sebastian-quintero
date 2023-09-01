import { strictEqual } from "node:assert";

function isSingleton(factory) {
  return factory() === factory();
}

class Singleton {
  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
  }
}

function singletonFactory() {
  return new Singleton();
}

class NonSingleton {
  constructor() {}
}

function nonSingletonFactory() {
  return new NonSingleton();
}

strictEqual(isSingleton(singletonFactory), true);
strictEqual(isSingleton(nonSingletonFactory), false);
