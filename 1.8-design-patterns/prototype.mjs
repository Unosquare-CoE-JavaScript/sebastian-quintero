import { deepStrictEqual, strictEqual } from "node:assert";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  clone() {
    return new Line(this.start.clone(), this.end.clone());
  }
}

const line1 = new Line(new Point(0, 0), new Point(1, 1));
const line2 = line1.clone();

line2.start.x = -1;
line2.start.y = -1;

deepStrictEqual(line1.start, new Point(0, 0));
deepStrictEqual(line2.start, new Point(-1, -1));
