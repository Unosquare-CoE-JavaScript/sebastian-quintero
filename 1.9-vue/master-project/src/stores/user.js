import { defineStore } from 'pinia'
import { auth, usersCollection } from '../includes/fake-server'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async register(values) {
      const credentials = await auth.createUserWithEmailAndPassword(values.email, values.password)

      await usersCollection.doc(credentials.user.uid).add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      this.isLoggedIn = true
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.isLoggedIn = true
    },
    async signOut() {
      await auth.singOut()

      this.isLoggedIn = false
    }
  }
})
