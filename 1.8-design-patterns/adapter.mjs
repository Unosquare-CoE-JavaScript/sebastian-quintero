import { strictEqual } from "node:assert";

class Square {
  constructor(side) {
    this.side = side;
  }
}

function calculateArea(rectangle) {
  return rectangle.width * rectangle.height;
}

class SquareToRectangleAdapter {
  constructor(square) {
    this._square = square;
  }

  get width() {
    return this._square.side;
  }

  get height() {
    return this._square.side;
  }
}

const square = new Square(10);

strictEqual(calculateArea(new SquareToRectangleAdapter(square)), 100);
