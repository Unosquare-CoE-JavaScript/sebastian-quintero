import { strictEqual } from "node:assert";

class ConstructorFieldBuilder {
  static get indent() {
    return 4;
  }

  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  toString() {
    const indent = " ".repeat(ConstructorFieldBuilder.indent);
    return `${indent}this.${this.fieldName} = ${this.fieldName};`;
  }
}

class ConstructorMethodBuilder {
  static get indent() {
    return 2;
  }

  constructor(object) {
    this.object = object;
  }

  addField(fieldName) {
    this.object[fieldName] = new ConstructorFieldBuilder(fieldName);
  }

  toString() {
    const indent = " ".repeat(ConstructorMethodBuilder.indent);
    const args = Object.keys(this.object).join(", ");
    const body = Object.values(this.object).join("\n");
    return `${indent}constructor(${args}) {\n${body}\n${indent}}`;
  }
}

class CodeBuilder {
  constructor(
    className,
    object = {},
    MethodBuilder = ConstructorMethodBuilder
  ) {
    this.className = className;
    this.object = object;
    this.methodBuilder = new MethodBuilder(this.object);
  }

  addField(fieldName) {
    this.methodBuilder.addField(fieldName);
    return this;
  }

  toString() {
    const constructorMethod = this.methodBuilder.toString(); // TODO
    return `class ${this.className} {\n${constructorMethod}\n}`;
  }
}

let cb = new CodeBuilder("Person");
cb.addField("name").addField("age");
const code = cb.toString();

strictEqual(
  code,
  `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}`
);

console.log(code);
