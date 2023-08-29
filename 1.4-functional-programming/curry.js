const add = (x, y) => x + y;

const curry = f => x => y => f(x, y);

const uncurry = f => (x, y) => f(x)(y);

const toPair = (f) => ([x, y]) => f(x, y);

const fromPair = (f) => (x, y) => f([x, y]);

const flip = (f) => (y, x) => f(x, y);

// y first because it's useful for define modN
const modulo = curry((y, x) => x % y);

const modulo2 = modulo(2); // (x) => x % 2

/** ------------------------------------- */
const curriedAdd = curry(add);

const increment = curriedAdd(1);
console.log(increment(4));
