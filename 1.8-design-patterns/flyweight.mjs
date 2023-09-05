import { strictEqual } from "node:assert";

class WordToken {
  constructor(capitalize = false) {
    this.capitalize = capitalize;
  }
}

class Sentence {
  constructor(words) {
    this.words = words.split(" ");
    this.tokens = {};
  }

  at(index) {
    if (this.tokens[index] == null) {
      this.tokens[index] = new WordToken();
    }
    return this.tokens[index];
  }

  toString() {
    let result = [];
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let token = this.tokens[i];
      if (token && token.capitalize) {
        result.push(word.toUpperCase());
      } else {
        result.push(word);
      }
    }
    return result.join(" ");
  }
}

const sentence = new Sentence("alpha beta gamma");
sentence.at(1).capitalize = true;

strictEqual(sentence.toString(), "alpha BETA gamma");
