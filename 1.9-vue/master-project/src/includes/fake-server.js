function clamp(value, min, max) {
  return Math.min(max, Math.max(value, min))
}

function random(min = 0, max = 1) {
  return (max - min) * Math.random() + min
}

function latency(mu, std) {
  return Math.floor(std * random(-1, 1) + mu)
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

var idStore = fromLocal('_id', 1)
var currentUserUidStore = fromLocal('_current_user_uid', null)
var userStore = fromLocal('_users', {})
var collectionStore = fromLocal('_collections', {})

function usersExists(email) {
  return Object.values(userStore.value).some((credentials) => credentials?.user?.email === email)
}

function usersEmailPasswordExists(email, password) {
  console.log(userStore)
  console.log(userStore.value)
  return Object.values(userStore.value).some(
    (credentials) => credentials?.user?.email === email && credentials?.user?.password === password
  )
}

const LATENCY = 300
const STD = 70

const fake = {
  auth() {
    var currentUser =
      currentUserUidStore.value != null ? userStore.value[currentUserUidStore.value].user : null

    function createUserWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
        if (usersExists(email)) {
          return reject()
        }

        const user = { uid: idStore.value, email, password }
        const credentials = { user }
        userStore.value[idStore.value++] = credentials

        currentUserUidStore.value = credentials.user.uid
        authObject.currentUser = credentials.user

        resolve(credentials)
      })
    }

    function signInWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
        if (!usersEmailPasswordExists(email, password)) {
          return reject()
        }

        const credentials = Object.values(userStore.value).find(
          (credentials) =>
            credentials.user.email === email && credentials.user.password === password
        )

        currentUserUidStore.value = credentials.user.uid
        authObject.currentUser = credentials.user

        resolve(credentials)
      })
    }

    function singOut() {
      return new Promise((resolve) => {
        currentUserUidStore.value = null
        authObject.currentUser = null

        resolve()
      })
    }

    var authObject = {
      currentUser,
      createUserWithEmailAndPassword: withLatency(createUserWithEmailAndPassword, LATENCY, STD),
      signInWithEmailAndPassword: withLatency(signInWithEmailAndPassword, LATENCY, STD),
      singOut: withLatency(singOut, LATENCY, STD)
    }

    return authObject
  },
  store() {
    function collection(name) {
      if (collectionStore.value[name] == null) {
        collectionStore.value[name] = {}
      }

      return {
        doc(docId) {
          async function add(data) {
            collectionStore.value[name][docId] = data
          }

          async function update(data) {
            for (let key in data) {
              collectionStore.value[name][docId][key] = data[key]
            }
          }

          return {
            add: withLatency(add, LATENCY, STD),
            update: withLatency(update, LATENCY, STD)
          }
        },
        async add(data) {
          const uuid = crypto.randomUUID()
          return this.doc(uuid).add(data)
        },
        where(key, op, value) {
          return {
            async get() {
              let records = []
              for (const [docId, data] of Object.entries(collectionStore.value[name])) {
                let result = eval(`data['${key}']${op}${value}`)
                if (result) {
                  records.push({
                    id: docId,
                    data() {
                      return JSON.parse(JSON.stringify(data))
                    }
                  })
                }
              }
              return records
            }
          }
        }
      }
    }

    return { collection }
  },
  storage() {
    function put(file) {
      var progress = new Set()
      var error = new Set()
      var success = new Set()

      var url = ''
      var cancelled = false
      var snapshot = {
        bytesTransfered: 0,
        totalBytes: file.size,
        ref: {
          name: file.name,
          async getDownloadURL() {
            return url
          }
        }
      }

      function cleanUp() {
        progress.clear()
        error.clear()
        success.clear()
      }

      function upload() {
        if (cancelled) {
          return
        }

        const chunk = random(0.2, 0.3) * snapshot.totalBytes
        snapshot.bytesTransfered = clamp(
          snapshot.bytesTransfered + chunk,
          snapshot.bytesTransfered,
          snapshot.totalBytes
        )

        progress.forEach((callback) => {
          callback(snapshot)
        })

        if (snapshot.bytesTransfered >= snapshot.totalBytes) {
          url = URL.createObjectURL(file)

          // TODO: check file limitations and trigger error callbacks
          success.forEach((callback) => {
            callback()
          })

          cleanUp()
        }

        if (snapshot.bytesTransfered < snapshot.totalBytes) {
          uploadWithLatency()
        }
      }

      var uploadWithLatency = withLatency(upload, LATENCY, STD)
      uploadWithLatency()

      function on(name, progressCallback, errorCallback, successCallback) {
        progress.add(progressCallback)
        error.add(errorCallback)
        success.add(successCallback)
      }

      function cancel() {
        cancelled = true

        cleanUp()
      }

      return { snapshot, on, cancel }
    }

    function child(path) {
      return { put }
    }

    function ref() {
      return { child }
    }

    return { ref }
  }
}

export const auth = fake.auth()

export const db = fake.store()

export const storage = fake.storage()

export const usersCollection = db.collection('users')

export const songsCollection = db.collection('songs')
