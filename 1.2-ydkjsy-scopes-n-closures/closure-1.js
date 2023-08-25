var isPrime = (function isPrimeCreator() {
    var primeCache = {};

    return function isPrime(v) {
        if (primeCache[v] != null) {
            return primeCache[v];
        }
        if (v <= 3) {
            return v > 1;
        }
        if (v % 2 == 0 || v % 3 == 0) {
            return false;
        }
        var vSqrt = Math.sqrt(v);
        for (let i = 5; i <= vSqrt; i += 6) {
            if (v % i == 0 || v % (i + 2) == 0) {
                primeCache[v] = false;
                return false;
            }
        }
        primeCache[v] = true;
        return true;
    }
});

var factorize = (function factorizeCreator() {
    var factors = {};
    return function factorize(v) {
        if (!isPrime(v)) {
            let i = Math.floor(Math.sqrt(v));
            while (v % i != 0) {
                i--;
            }
            factors[v] = [
                ...factorize(i),
                ...factorize(v / i)
            ];
            return factors[v];
        }
        return [v];
    }
});
