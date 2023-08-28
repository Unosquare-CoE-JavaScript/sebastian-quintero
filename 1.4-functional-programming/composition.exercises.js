import _, { sort } from 'ramda'

{
    const availablePrices = function (cars) {
        const available_cars = _.filter(_.prop(('in_stock'), cars));
        return available_cars.map(x => formatMoney(x.dollar_value)).join(', ');
    }
}

const formatDollarValue = _.compose(formatMoney, _.prop('dollar_value'));

const availablePrices = _.compose(
    _.join(', '),
    _.map(formatDollarValue),
    _.filter(_.prop('in_stock')),
);

{
    const fastestCar = function (cars) {
        const sorted = _.sortBy(car => car.horsepower, cars);
        const fastest = _.last(sorted);
        return fastest.name + ' is the fastest';
    }
}

const append = _.flip(_.concat);

const fastestCar = _.compose(
    append(' is the fastest'),
    _.prop('name'),
    _.last,
    _.sortBy(_.prop('horsepower'))
);
