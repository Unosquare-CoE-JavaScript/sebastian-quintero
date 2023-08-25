/**
 * @template T
 * @typedef {T | Promise<T>} RawOrPromise
 */

/**
 * @template T
 * @typedef {RawOrPromise<T> | () => RawOrPromise<T>} AtomInit
 */

/**
 * @template T
 * @typedef {() => T} AtomGetter
 */

/**
 * @template T
 * @typedef {T | (prev: T) => T} AtomSetter
 */

/**
 * @template T
 * @typedef {(callback: (next: T) => void) => AtomUnsubscribe} AtomSubscribe
 */

/**
 * @typedef {() => void} AtomUnsubscribe
 */

/**
 * @template T 
 * @typedef {object} Atom
 * @property {AtomGetter<T>} get
 * @property {AtomSetter<T>} set
 * @property {AtomSubscribe<T>} subscribe
 */

/** @type {<T>(initialValue: AtomInit<T>) => Atom<T>} */
function atom(initialValue) {
    const initial = typeof initialValue === 'function' ? initialValue() : initialValue;
    var _value = initial instanceof Promise ? initial.then(set) : initial;

    var _subscriptions = new Set();

    function get() {
        return _value;
    }

    function set(newValue) {
        _value = typeof newValue === 'function' ? newValue(_value) : newValue;
        for (callback of _subscriptions) {
            callback(_value);
        }
    }

    function subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Expect suscriber to be a function');
        }

        _subscriptions.add(callback);
        return function unsubscribe() {
            _subscriptions.delete(callback);
        }
    }

    return {
        get,
        set,
        subscribe,
    };
}

const count = atom(1);
count.subscribe(console.log);
count.set((prevCount) => prevCount + 1);
count.set((prevCount) => prevCount + 1);
count.set((prevCount) => prevCount + 1);
