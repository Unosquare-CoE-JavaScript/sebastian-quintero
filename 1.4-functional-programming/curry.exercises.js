import { curry, reduce } from 'ramda';

const _keepHighest = (x, y) => x >= y ? x : y;

{
    const max = function (xs) {
        return _.reduce(function (acc, x) {
            return _keepHighest(acc, x);
        }, 0, xs);
    }
}

const max = reduce(_keepHighest, 0);

const slice = curry((start, end, xs) => xs.slice(start, end));
