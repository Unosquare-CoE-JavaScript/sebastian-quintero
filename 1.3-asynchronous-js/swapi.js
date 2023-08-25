var swapi = (function SWAPIFactory() {

    const BASE_URL = 'https://swapi.dev/api';

    function decorate(target, mappers) {
        return new Proxy(target, {
            get(target, p, receiver) {
                if (mappers[p] != null) {
                    return mappers[p];
                }
                return Reflect.get(...arguments);
            }
        });
    }

    function decorateEntity(url, virtualMap) {
        return function request() {
            var controller = new AbortController();
            var target = fetch(url, { signal: controller.signal })
                .then(res => res.json())
                .then(res => res.results);

            var mappers = Object.entries(virtualMap)
                .reduce((mappers, [key, callback]) => {
                    mappers[key] = () => target.then((res) => res.map(callback));
                    return mappers;
                }, {});

            return decorate(target, mappers);
        }
    }

    class AsyncEntityBuilder {
        _virtualMap = {};

        constructor(endpoint) {
            this._url = `${BASE_URL}${endpoint}`;
        }

        map(key, callback) {
            this._virtualMap[key] = callback;
            return this;
        }

        property(key) {
            this.map(key, (entity) => entity[key]);
            return this;
        }

        build() {
            return decorateEntity(this._url, this._virtualMap);
        }
    }

    function createEntity(endpoint) {
        return new AsyncEntityBuilder(endpoint);
    }

    const planets = createEntity('/planets')
        .map('url', (planet) => planet.url)
        .property('name')
        .build();

    return {
        planets,
    };

})();

const planets = swapi.planets();

planets
    .url()
    .then(console.log);

planets
    .name()
    .then(console.log);
