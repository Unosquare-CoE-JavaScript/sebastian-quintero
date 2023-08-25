# Asynchronous JavaScript

## Section 2: Understanding Asynchronous Coding

Synchronous code: A pice of code starts and finish before the next one is executed.

Asynchronous code: A non-blocking code that allows other code to be executed while it's in progress.

| Synchronous                         | Asynchronous                          |
| ----------------------------------- | ------------------------------------- |
| + Easy to write and to reason about | + Very performant                     |
| - May create blocking code          | + Eliminates code blocking            |
| - Less performant                   | - It can be difficult to reason about |
|                                     | - Harder to write                     |

## Section 3: The Necessity of Callbacks

Callbacks are function that will be called by a routine when after some kind of synchronous/asynchronous code is executed.

Drawbacks:
* Callback Hell: Nested callbacks are harder to read and follow.
* Difficult to Reason About
* Inversion of Control

## Section 4: Promises

Promise is an object which represents the eventual completion or failure or an asynchronous operation and provides a resulting value for the succeeded path.

`Promise.all`: Wait for several promises in the form of an array. If any fail, the method rejects with the failure reason. If all promises are fulfilled, the method resolves with an array of results.

`Promise.race`: A race between several promises in the form of an array. Returns a new promise which resolves or rejects based on the first promise that resolves or rejects.

`Promise.allSettled`: Wait for several promises in the form of an array to be resolved or rejected. It creates an object with the status, fulfilled or rejected, and the value based on the promise status.

`Promise.any`: Response as soon as one is fulfilled.

### The AbortController

AbortController is an object that allows to emit an abort event to cancel an asynchronous operation.

## Section 5: Async Await

`async` keyword forces a function to return a Promise.

`await` keyword:

* Can only be use inside an async function
* Waits for a promise
* Causes the async function to pause

## Section 6: Generators

A function that allows exit when `yield` and can be accessed later at the same line the `yield` happened.

### Symbol.iterator

```js
const obj = {
    1: 'hello',
    2: 'world',
};

// Fail, obj doesn't have Symbol.iterator key
for (const v of obj) {
    console.log(v);
}

obj[Symbol.iterator] = function* iterator() {
    for (let i = 1; i < 3; ++i) {
        yield this[i];
    }
}

// Will print 'hello' then 'world' as Symbol.iterator is defined now
for (const v of obj) {
    console.log(v);
}
```

### Two-way communication

```js
function* scanner() {
    let val = yield;
    console.log(val);
}

const it = scanner();
it.next('hello world'); // Will print hello world
```

```js
function* scanner() {
    let val = yield 'enter a value';
    console.log(`val is ${val}`);
}

const it = scanner();
const prompt = it.next().value;
console.log(prompt); // enter a value;
it.next(500); // val is 500
```
