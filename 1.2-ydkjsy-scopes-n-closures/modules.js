function calculator() {
    var result = 0;
    var currentNum = '';
    var lastOperator = null;

    function parseCurrentNumber() {
        const numericValue = Number.parseInt(currentNum);
        currentNum = '';
        return numericValue;
    }

    function dispatchLastOperator() {
        if (lastOperator != null) {
            lastOperator();
            lastOperator = null;
        }
    }

    function insertNumber(num) {
        currentNum = `${currentNum}${num}`;
        return `${num}`;
    }

    function operator(symbol, callback) {
        function eval() {
            const numericValue = parseCurrentNumber();
            result = callback(result, numericValue);
            return currentNum;
        }

        return function display() {
            if (lastOperator == null && currentNum != '') {
                result = parseCurrentNumber();
            } else if (lastOperator != null && currentNum != '') {
                dispatchLastOperator();
            }
            lastOperator = eval;
            return symbol;
        }
    }

    function display() {
        dispatchLastOperator();
        return `${result}`
    }

    return {
        number: insertNumber,
        plus: operator('+', (a, b) => a + b),
        minus: operator('-', (a, b) => a - b),
        mult: operator('*', (a, b) => a * b),
        div: operator('/', (a, b) => a / b),
        eq: display,
    };
}

var calc = calculator();

console.log(calc.number('4'));
console.log(calc.plus());
console.log(calc.number('7'));
console.log(calc.number('3'));
console.log(calc.minus());
console.log(calc.number('2'));
console.log(calc.eq());

console.log(calc.number('5'));
console.log(calc.minus());
console.log(calc.mult());
console.log(calc.number('5'));
console.log(calc.eq());
