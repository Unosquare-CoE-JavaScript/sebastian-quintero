function range(start, end) {
    function createRange(end) {
        const array = [];
        for (let n = start; n <= end; ++n) {
            array.push(n);
        }
        return array;
    }

    if (typeof end !== 'number' || Number.isNaN(end)) {
        return createRange;
    }

    return createRange(end);
}

function assertArrayEqual(received, expected) {
    if (Array.isArray(expected) && Array.isArray(received)) {
        if (JSON.stringify(expected) !== JSON.stringify(received)) {
            throw new Error(`expect "${received}" to be "${expected}"`);
        }
    } else {
        throw new TypeError('expected arguments to be both arrays');
    }
}

assertArrayEqual(range(3,3), [3]);
assertArrayEqual(range(3,8), [3, 4, 5, 6, 7, 8]);
assertArrayEqual(range(3,0), []);

var start3 = range(3);

assertArrayEqual(start3(3), [3]);
assertArrayEqual(start3(8), [3, 4, 5, 6, 7, 8]);
assertArrayEqual(start3(0), []);

var start4 = range(4);

assertArrayEqual(start4(6), [4, 5, 6]);
