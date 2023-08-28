# Functional Programming

"Programming with functions"

## Pure functions

Every function is a single-valued collection of pairs.

Rules:

* For every input there is a corresponding output
* Always receive the same output for a given input
* No observable effects besides computing a value

### Why?

* Reliable
* Portable
* Reusable
* Testable
* Composable
* Properties/Contract

## Currying

Transform a function into single argment call. You'd want something you want to remember at the very beginning positions and the data for the function at the end.

## Composition

It's an associative operation, so the order of composition doesn't matter.

When combining with currying, you can convert any function into a unary function, so it can be composed.

## Functors

Something with a `map` method. `map` is a method that transform somehow the input and returns a boxed instance with the `map` method.
```js
const Box = x => ({
    map: f => Box(f(x)),
    /** chain: (f: (x: T) => Box<T>) => Box<T> */
    chain: f => f(x),
    /** fold: (f (x: T) => T) => T */
    fold: f => f(x),
    toString: `Box(${x})`,
});

const halfTheFirstLargeNumber = x => Box(x)
    .map(_.filter(x => x >= 20))
    .map(_.first)
    .map(x => x / 2)
    .fold(x => `The answer is ${answer}`);
```

## Monads

`Either` is a functor and a monad. It has the same functionality as if-else block.
```js
const Left = x => ({
    map: f => Box(f(x)),
    fold: (g, f) => g(x)
})

const Right = x => ({
    map: f => Box(f(x)),
    fold: (g, f) => f(x)
})

const findColor = name => {
    const found = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name];
    return found ? Right(found) : Left('missing');
}
```

`fromNullable`
```js
const Left = x => ({
    map: f => Box(f(x)),
    fold: (g, f) => g(x)
})

const Right = x => ({
    map: f => Box(f(x)),
    fold: (g, f) => f(x)
})

const fromNullable = x => x != null ? Right(x) : Left()

const findColor = name => 
    fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);
```
