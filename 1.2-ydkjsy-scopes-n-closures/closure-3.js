function calculator() {
    var result = 0;
    var currentNum = '';
    var lastOperator = null;

    function parseCurrentNumber() {
        // console.group('parseCurrentNumber');
        // console.log({ currentNum });
        const numericValue = Number.parseInt(currentNum);
        currentNum = '';
        // console.groupEnd();
        return numericValue;
    }

    function dispatchLastOperator() {
        // console.group('dispatchLastOperator');
        if (lastOperator != null) {
            lastOperator();
            lastOperator = null;
        }
        // console.log({ result });
        // console.groupEnd();
    }

    function numInsert(num) {
        return function insert() {
            currentNum = `${currentNum}${num}`;
            return `${num}`;
        }
    }

    function operator(symbol, callback) {
        function eval() {
            // console.group('operator.eval');
            // console.log({ symbol });
            const numericValue = parseCurrentNumber();
            // console.log({ result, numericValue });
            result = callback(result, numericValue);
            // console.log({ result, currentNum });
            // console.groupEnd();
            return currentNum;
        }

        return function display() {
            // console.group('operator.display');
            // console.log({ symbol });
            if (lastOperator == null && currentNum != '') {
                result = parseCurrentNumber();
            } else if (lastOperator != null && currentNum != '') {
                dispatchLastOperator();
            }
            // console.log({ currentNum });
            lastOperator = eval;
            // console.groupEnd();
            return symbol;
        }
    }

    function display() {
        // console.group('display');
        dispatchLastOperator();
        // console.groupEnd();
        return `${result}`
    }

    var opcodes = {
        '0': numInsert(0),
        '1': numInsert(1),
        '2': numInsert(2),
        '3': numInsert(3),
        '4': numInsert(4),
        '5': numInsert(5),
        '6': numInsert(6),
        '7': numInsert(7),
        '8': numInsert(8),
        '9': numInsert(9),
        '+': operator('+', (a, b) => a + b),
        '-': operator('-', (a, b) => a - b),
        '*': operator('*', (a, b) => a * b),
        '/': operator('/', (a, b) => a / b),
        '=': display,
    };

    return function op(key) {
        if (opcodes[key] == null) {
            throw new Error(`Not operation supported "${key}"`);
        }
        return opcodes[key]();
    }
}

var calc = calculator();

console.log(calc('4'));
console.log(calc('+'));
console.log(calc('7'));
console.log(calc('3'));
console.log(calc('-'));
console.log(calc('2'));
console.log(calc('='));
console.log(calc('*'));
console.log(calc('4'));
console.log(calc('='));
console.log(calc('5'));
console.log(calc('-'));
console.log(calc('5'));
console.log(calc('='));

console.log(calc('5'));
console.log(calc('-'));
console.log(calc('*'));
console.log(calc('5'));
console.log(calc('='));
