(function () {
    const globalScopeObject =
        (typeof globalThis != "undefined") ? globalThis :
            (typeof global != "undefined") ? global :
                (typeof window != "undefined") ? window :
                    (typeof self != "undefined") ? self :
                        (new Function("return this"))();

    const cache = {}

    function factorial(n) {
        if (cache[n] != null) {
            return cache[n];
        }

        let result = 1;
        for (let i = n; i > 1; --i) {
            if (cache[i] != null) {
                result = result * cache[i];
                cache[n] = result;
                // for (let j = i + 1; j < n; ++j) {
                //     cache[j] = j * cache[i];
                // }
                break;
            } else {
                result = result * i;
            }
        }

        return result;
    }

    globalScopeObject.factorial = factorial;
})();

console.log(factorial(2));

console.log(factorial(6));
console.log(factorial(7));

console.log(factorial(8));
console.log(factorial(9));
console.log(factorial(10));

console.log(factorial(25));

console.log(factorial(50));
