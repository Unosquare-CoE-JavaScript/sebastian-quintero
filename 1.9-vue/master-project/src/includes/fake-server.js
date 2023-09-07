function latency(mu, std) {
  return Math.floor(std * (2 * Math.random() - 1) + mu)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function withLatency(fn, ms, std) {
  return function delayed() {
    return sleep(latency(ms, std)).then(fn.bind(null, ...arguments))
  }
}

function reactive(object, onChange) {
  if (object == null) {
    return object
  }

  if (typeof object !== 'object') {
    return object
  }

  var reactiveObject = Object.create(object)

  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      reactiveObject[property] = reactive(object[property], onChange)
    }
  }

  return new Proxy(reactiveObject, {
    set(target, property, newValue, receiver) {
      target[property] = reactive(newValue, onChange)
      // const result = Reflect.set(...arguments)
      onChange(target, property, newValue, receiver)
      return true
    }
  })
}

function fromLocal(key, defaultValue = undefined) {
  var value
  try {
    value = JSON.parse(localStorage.getItem(key)) ?? defaultValue
  } catch {
    value = defaultValue
  }
  var store = reactive({ value }, () => {
    localStorage.setItem(key, JSON.stringify(store.value))
  })
  return store
}

function getItem(key, defaultValue = undefined) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

var id = fromLocal('_id', 1)
var users = fromLocal('_users', {})
var collections = fromLocal('_collections', {})

function usersExists(email) {
  return Object.values(users).some((user) => user.email === email)
}

const LATENCY = 300
const STD = 70

const fake = {
  auth() {
    function createUserWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
        if (usersExists(email)) {
          return reject()
        }

        const user = { id: id.value, email, password }
        users.value[id.value++] = user

        resolve(user)
      })
    }

    return {
      createUserWithEmailAndPassword: withLatency(createUserWithEmailAndPassword, LATENCY, STD)
    }
  },
  store() {
    async function add(doc) {
      collections.value[name].push(doc)
    }

    function collection(name) {
      if (collections.value[name] == null) {
        collections.value[name] = []
      }
      return {
        add: withLatency(add, LATENCY, STD)
      }
    }

    return { collection }
  }
}

export const auth = fake.auth()

export const db = fake.store()

export const usersCollection = db.collection('users')
