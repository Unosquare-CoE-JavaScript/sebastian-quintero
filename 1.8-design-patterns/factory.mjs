import { strictEqual } from "node:assert";

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  static _id = 0;

  static get id() {
    return this._id;
  }

  createPerson(name) {
    return new Person(PersonFactory._id++, name);
  }
}

const personFactory1 = new PersonFactory();
const personFactory2 = new PersonFactory();

const person1 = personFactory2.createPerson("Jhon");
const person2 = personFactory1.createPerson("Bob");

strictEqual(person1.id, 0);
strictEqual(person2.id, 1);
