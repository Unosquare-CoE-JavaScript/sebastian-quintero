function* fibonacci() {
    var last = 0;
    yield last;
    var current = 1;
    yield current;

    while (true) {
        let fn = current + last;
        last = current;
        current = fn;
        yield fn;
    }
}

const fibo = fibonacci();
const first100 = new Array(100).fill().map(() => fibo.next().value);
console.log(first100);
