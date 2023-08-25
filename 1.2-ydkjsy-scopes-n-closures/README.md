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

Curly braces `{ ... }` need a scope declaration like `let`, `const`, `function` inside to be defined as an scope.

## Chapter 7: Use Closures

Closure is the ability of functions to access outer scope. Closure is a live link to variables allowing a function to modify those variables and keep tracking of their updates.

## Chapter 8: The Module Pattern

Namespaces: A stateless group of functions.
```js
// namespace
var Utils = {
    wait(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }
}
```

Data Structures: A stateful grouping.
```js
// data structure
var Student = {
    // public access
    reconds: [
        { id: 14, name: "Kyle" },
    ],
    getName(studentId) {
        const student = this.records.find(
            student => student.id === studentId
        );
        return student.name;
    }
}
```

Modules: A stateful access control
```js
var Student = (function defineStudent() {
    // private access
    var records = [
        { id: 14, name: "Kyle" },
    ];

    function getName(studentId) {
        const student = this.records.find(
            student => student.id === studentId
        );
        return student.name;
    }

    return {
        getName,
    };
})();
```

CommonJS: export all or nothing via `module.exports`

* File base modules.
* Module instance are singletons.
* Everything is private by default.
* Use `module.exports` object to expose a public API.
* `Object.assign(module.exports, { /* ...public API */ })` is encouraged to prevent circular dependencies and overwrite issues.
* Use `require(/* path */)` for include an external module.

ESM: As CommonJS, these are file-based modules but are strict (`"use strict";`) by default.

* File base modules.
* Module instance are singletons.
* Everything is private by default.
* Use `export` keyword for exposing something to the public API.
* Use `import` keyword for include an external module.

AMD: Asynchronous Module Definition (RequireJS)
```js
define([ "./Student" ], function StudentList(Student) {
    var elems = [];

    return {
        renderList() {
            // ...
        }
    }
});
```

UMD: Universal Module Definition. It's less specific. Extract format and more a collection of similar formats. It was designed to create a better interop for modules that may be loaded in browsers, by AMD-style loaders, or in Node.
```js
(function UMD(name, context, definition) {
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition(name, context);
    } else {
        context[name] = definition(name, context);
    }
})('StudentList', this, function DEF(name, context) {
    var elems = [];

    return {
        renderList() {
            // ...
        }
    }
});
```
