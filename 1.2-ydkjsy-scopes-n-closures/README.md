# You Don't Know JS Yet: Scopes & Closures

## Chapter 1: What's the Scope?

JS is parsed/compiled before execution begins. JS functions are themselves first-class values that keep the original scope no matter where the are executed/called.

Interpreted code is executed line by line. Compiled code is processed first, then executed.

Compiler Stages:

1. Tokenizing/Lexing: breaking up a string of characters into meaningful chunks called tokens. e. g. `"var a = 0;"` is breaking as `["var", "a", "=", "0"]`.
2. Parsing: taking a stream of tokens and turning them into an AST (Abstract Syntax Tree).
3. Code Generation: taking an AST and turning it into executable code. e. g. Assembly code, JVM byte code, WASM.

Lexical scope is determined at compile time.

## Chapter 2: Illustrating Lexical Scope

Every scope, even the global one, is controlled by an "scope manager". The scope manager creates a "bucket" for all the variables defined within an scope block.

## Chapter 3: The Scope Chain

Shadowing: Reusing a variable identifier from a nested scope.

```
var one = 1;
let notOne = 2;
const notTwo = 3;

console.log(window.one); // 1
console.log(window.notOne); // undefined
console.log(window.notTwo); // undefined
```

`let` can shadow `var` but `var` cannot shadow `let`. `var` can only shadow `let` if there is a function boundary in between.

## Chapter 4: Around the Global Scope

Always use `var` for globals. Reserve `let` and `const` for block scopes.

A module's top level scope is a decendant of the global scope.

Objects referencing the global scope:

* `window`: Browser Environment
* `self`: Web Worker Environment
* `global`: Node.js Environment
* `globalThis`: ES2020 Standard

```js
const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
    (typeof global != "undefined") ? global :
    (typeof window != "undefined") ? window :
    (typeof self != "undefined") ? self :
    (new Function("return this"))();
```

## Chapter 5: The (Not So) Secret Lifecycle of Variables

TDZ applies for `let` and `const` variables only.

## Chapter 6: Limiting Scope Exposure

POLE: Principle Of Least Exposure

POLP: Principle Of Least Privilege
