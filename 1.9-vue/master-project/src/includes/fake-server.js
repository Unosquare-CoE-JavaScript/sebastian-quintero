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

function collection(name) {
  collections.value[name] = []
  return {
    async add(doc) {
      collections.value[name].push(doc)
    }
  }
}

const fake = {
  auth() {
    return { createUserWithEmailAndPassword }
  },
  store() {
    return { collection }
  }
}

export const auth = fake.auth()

export const db = fake.store()

export const usersCollection = db.collection('users')
