import { strictEqual } from "node:assert";

class Person {
  constructor(age = 0) {
    this.age = age;
  }

  drink() {
    return "drinking";
  }

  drive() {
    return "driving";
  }

  drinkAndDrive() {
    return "driving while drunk";
  }
}

class ResponsiblePerson {
  constructor(age) {
    this.person = new Person(age);
  }

  drink() {
    if (this.person.age >= 18) {
      return this.person.drink();
    }
    return "too young";
  }

  drive() {
    if (this.person.age >= 16) {
      return this.person.drive();
    }
    return "too young";
  }

  drinkAndDrive() {
    return "dead";
  }
}

const responsiblePerson1 = new ResponsiblePerson(12);

strictEqual(responsiblePerson1.drink(), "too young");
strictEqual(responsiblePerson1.drive(), "too young");
strictEqual(responsiblePerson1.drinkAndDrive(), "dead");

const responsiblePerson2 = new ResponsiblePerson(25);

strictEqual(responsiblePerson2.drink(), "drinking");
strictEqual(responsiblePerson2.drive(), "driving");
strictEqual(responsiblePerson2.drinkAndDrive(), "dead");

const responsiblePerson3 = new ResponsiblePerson(17);

strictEqual(responsiblePerson3.drink(), "too young");
strictEqual(responsiblePerson3.drive(), "driving");
strictEqual(responsiblePerson3.drinkAndDrive(), "dead");
