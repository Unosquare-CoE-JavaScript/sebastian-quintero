import { strictEqual } from "node:assert";

class SingleValue {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

class ManyValues extends Array {
  get value() {
    let result = 0;
    for (let num of this) {
      if (typeof num === "number") {
        result += num;
      } else {
        result += num.value;
      }
    }
    return result;
  }
}

function sum(array) {
  let result = 0;
  for (let num of array) {
    result += num.value;
  }
  return result;
}

const singleValue = new SingleValue(11);
const manyValues = new ManyValues();
manyValues.push(22);
manyValues.push(33);

strictEqual(sum([singleValue, manyValues]), 66);
