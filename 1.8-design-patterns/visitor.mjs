import { strictEqual } from "node:assert";

class Value {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitValue(this);
  }
}

class BinaryExpression {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

class AdditionExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression {
  constructor(lhs, rhs) {
    super(lhs, rhs);
  }

  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressionPrinter {
  constructor() {
    this.toPrint = [];
  }

  visitValue(value) {
    this.toPrint.push(value.value);
  }

  visitAddition(ae) {
    this.toPrint.push("(");
    ae.lhs.accept(this);
    this.toPrint.push("+");
    ae.rhs.accept(this);
    this.toPrint.push(")");
  }

  visitMultiplication(me) {
    me.lhs.accept(this);
    this.toPrint.push("*");
    me.rhs.accept(this);
  }

  toString() {
    return this.toPrint.join("");
  }
}

const expr = new AdditionExpression(new Value(2), new Value(3));

let ep = new ExpressionPrinter();
ep.visitAddition(expr);

strictEqual(ep.toString(), "(2+3)");
