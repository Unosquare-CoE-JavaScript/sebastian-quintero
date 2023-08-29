const fs = require('fs');

const Left = x => ({
    map: f => Left(x),
    fold: (g, f) => g(x),
    chain: f => Left(x),
    toString: () => `Left(${x})`,
});

const Right = x => ({
    map: f => Right(f(x)),
    fold: (g, f) => f(x),
    chain: f => f(x),
    toString: () => `Right(${x})`,
});

const fromNull = x => x != null ? Right(x) : Left(x);

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
}

const readFileSync = path => tryCatch(() => fs.readFileSync(path))

const parseJSON = text => tryCatch(() => JSON.parse(text))

const giveDefaultAndLogError = defaultValue => e => { console.error(e); return defaultValue; }

const getPort = () =>
    readFileSync('./config.json')
    .chain(parseJSON)
    .map(config => config.port)
    .fold(giveDefaultAndLogError(8080), x => x)

console.log(getPort());
