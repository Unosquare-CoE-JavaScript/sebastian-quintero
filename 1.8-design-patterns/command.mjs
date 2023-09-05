import { strictEqual } from "node:assert";

const Action = Object.freeze({
  DEPOSIT: 0,
  WITHDRAW: 1,
});

class Command {
  constructor(action, amount) {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account {
  constructor(balance = 0) {
    this.balance = balance;
  }

  _deposit(amount) {
    this.balance += amount;
  }

  _withdraw(amount) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  process(command) {
    switch (command.action) {
      case Action.DEPOSIT:
        this._deposit(command.amount);
        command.success = true;
        break;
      case Action.WITHDRAW:
        command.success = this._withdraw(command.amount);
        break;
    }
  }
}

let account = new Account(100);

account.process(new Command(Action.DEPOSIT, 50));
strictEqual(account.balance, 150);

account.process(new Command(Action.WITHDRAW, 100));
strictEqual(account.balance, 50);

let command = new Command(Action.WITHDRAW, 200);
account.process(command);
strictEqual(command.success, false);
strictEqual(account.balance, 50);
