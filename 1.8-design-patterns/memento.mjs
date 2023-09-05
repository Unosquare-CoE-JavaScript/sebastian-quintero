class Token {
  constructor(value = 0) {
    this.value = value;
  }

  clone() {
    return new Token(this.value);
  }
}

class Memento {
  constructor() {
    this.tokens = [];
  }
}

class TokenMachine {
  constructor() {
    this.tokens = [];
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    this.tokens.push(token);
    return new Memento(this.tokens.map((token) => token.clone()));
  }

  revert(m) {
    this.tokens = m.tokens.map((token) => token.clone());
  }
}
