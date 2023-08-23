var namedFunction = function (test) {
    console.log(test);
}

console.log(namedFunction.name); // namedFunction

function printFuntionName(fnExpr) {
    console.log(fnExpr.name);
}

printFuntionName(function () {}); // <anonymous function>
