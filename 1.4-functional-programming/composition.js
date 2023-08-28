const toUpper = str => str.toUpperCase();

const exclaim = str => str + '!';

const compose = (f, g) => x => f(g(x));

const shout = compose(exclaim, toUpper);

console.log(shout('hello'));
