import { strictEqual } from "assert";

class CombinationLock {
  constructor(combination) {
    this._combination = combination;
    this._step = 0;
    this._status = "LOCKED";
  }

  get status() {
    return this._status;
  }

  enterDigit(digit) {
    switch (this._status) {
      case "LOCKED":
        if (digit === this._combination[0]) {
          this._status = `${this._combination[0]}`;
          this._step++;
        }
        break;

      case "ERROR":
        if (digit === this._combination[0]) {
          this._status = `${this._combination[0]}`;
          this._step = 1;
        }
        break;

      default:
        if (this._combination.length === this._step + 1) {
          this._status = "OPEN";
        } else if (digit === this._combination[this._step]) {
          this._status = `${this._status}${digit}`;
          this._step++;
        } else {
          this._status = "ERROR";
          this._step = 0;
        }
        break;
    }
  }
}

const combinationLock = new CombinationLock([1, 2, 3, 4, 5]);
strictEqual(combinationLock.status, "LOCKED");

combinationLock.enterDigit(1);
strictEqual(combinationLock.status, "1");

combinationLock.enterDigit(2);
strictEqual(combinationLock.status, "12");

combinationLock.enterDigit(3);
strictEqual(combinationLock.status, "123");

combinationLock.enterDigit(4);
strictEqual(combinationLock.status, "1234");

combinationLock.enterDigit(5);
strictEqual(combinationLock.status, "OPEN");
