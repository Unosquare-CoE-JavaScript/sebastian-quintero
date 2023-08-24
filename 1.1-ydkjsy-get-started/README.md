# You Don't Know JS Yet: Get Started

## Chapter 1: What Is JS?

ECMA is an standard definition of the lagunage as defined by TC39. Every version is named as the year of implementation e. g. ES2019.

JavaScript was creating as a marketing ploy that bet WebJava. JavaScript running in the browser or Node.js is an implemenation of ECMAScript.

TC39 is a committee of 50-100 people from web-invested companies. All proposals progress through a five-stage process.

The console or developer tools as a "JS-Friendly" environments but don't do exact the same ting the browser does with `.js` files.

JS is a multi-paradigm backwards-compatible language. It allows OOP, Functional Programming and Procedural Programming. As well as TC39 always try to "don't break the web" when new features are added to the language. Also, it's a compiled laguage which process and verify a program before it executes.

Babel could transpile `let` keyword to an old ES definition:
```
if (something) {
    let x = 3;
    console.log(x);
} else {
    let x = 4;
    console.log(x);
}
```
Transpiles to:
```
var x$0, x$1;
if (something) {
    x$0 = 3;
    console.log(x$0);
} else {
    x$1 = 4;
    console.log(x$1);
}
```

## Chapter 2: Surveying JS

`typeof null === 'object'` is a bug.

Converting from one value type to another is called "coercion". The triple equal `===` disallows any sort of type conversion in its comparison.

## Chapter 3: Digging to the Roots of JS

Iterator pattern provides a `next()` method to retrieve an element from a collection.

```
const it = /* .. */
for (let val of it) {
    ...
}
```

The `...` operator has two symmetrical forms, _spread_ and _rest_.
```
var vals = [...it];

doSomething(...it);
```

### `this` keyword

_Scope_ is the set of rules that controls how references to variables are resolved. But, functions also have another characteristic called _execution context_. _Scope_ is static and contains fixed set of variables but the _execution context_ is dynamic and depends on how the function is called.

`Object.create` allows to set the `prototype` for an object. `Object.create(null)` prevents `prototype` injection issue.

## Chapter 4: The Bigger Picture

### Pillar 1: Scope and Clousure

JS lexical scope characteristics:

* _hoisting_: When all variables declared anywhere in a scope are treated as if they're declared at the beginning of the scope.
* _var-declared variables_: These variables are function scoped, even if they appear inside a block.

### Pillar 2: Prototypes

Classes are not the only way of creating objects in JS. Prototype allows cooperation through the prototype chain.

### Pillar 3: Types and Coercion
