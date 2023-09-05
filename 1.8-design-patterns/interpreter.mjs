import { strictEqual } from "node:assert";

function isNumericString(c) {
  return "0123456789".includes(c);
}

function isLetter(c) {
  return "abcdefghijklmnopqrstuvwxyz".includes(c);
}

const Operation = Object.freeze({
  Addition: 0,
  Substration: 1,
});

function operation(type, left, rigth) {
  switch (type) {
    case Operation.Addition:
      return left + rigth;
    case Operation.Substration:
      return left - rigth;
  }
  return 0;
}

const TokenType = Object.freeze({
  Integer: 0,
  Variable: 1,
  Plus: 2,
  Minus: 3,
});

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }
}

class ExpressionProcessor {
  constructor() {
    this.variables = {};
  }

  _lex(input) {
    let result = [];

    for (let i = 0; i < input.length; ++i) {
      let chr = input[i];
      switch (chr) {
        case "+":
          result.push(new Token(TokenType.Plus, chr));
          break;
        case "-":
          result.push(new Token(TokenType.Minus, chr));
          break;
        default:
          let buffer = [];
          if (isLetter(chr)) {
            buffer.push(chr);
            for (let j = i + 1; j < input.length; ++j) {
              chr = input[j];
              if (isLetter(chr)) {
                buffer.push(chr);
                ++i;
              } else {
                break;
              }
            }
            result.push(new Token(TokenType.Variable, buffer.join("")));
          } else if (isNumericString(chr)) {
            buffer.push(chr);
            for (let j = i + 1; j < input.length; ++j) {
              chr = input[j];
              if (isNumericString(chr)) {
                buffer.push(chr);
                ++i;
              } else {
                break;
              }
            }
            result.push(new Token(TokenType.Integer, buffer.join("")));
          }
          break;
      }
    }

    return result;
  }

  _parse(tokens) {
    let result = 0;
    let op = null;
    let error = false;

    for (let i = 0; i < tokens.length; ++i) {
      if (error) {
        break;
      }

      let token = tokens[i];

      switch (token.type) {
        case TokenType.Integer:
          let integer = parseInt(token.text);
          result = operation(
            op == null ? Operation.Addition : op,
            result,
            integer
          );
          break;

        case TokenType.Variable:
          if (token.text.length > 1) {
            error = true;
          } else if (this.variables[token.text] == null) {
            error = true;
          } else {
            result = operation(
              op == null ? Operation.Addition : op,
              result,
              this.variables[token.text]
            );
          }
          break;

        case TokenType.Plus:
          op = Operation.Addition;
          break;

        case TokenType.Minus:
          op = Operation.Substration;
          break;

        default:
          break;
      }
    }

    if (error) {
      return 0;
    }

    return result;
  }

  calculate(expression) {
    const tokens = this._lex(expression);
    const result = this._parse(tokens);
    return result;
  }
}

let processor = new ExpressionProcessor();

strictEqual(processor.calculate("1+2+3"), 6);
strictEqual(processor.calculate("1+2+xy"), 0);

processor.variables["x"] = 3;

strictEqual(processor.calculate("10-2-x"), 5);
