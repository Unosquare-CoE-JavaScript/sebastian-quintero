import { defineStore } from 'pinia'
import { auth, usersCollection } from '../includes/fake-server'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    async register(values) {
      await auth.createUserWithEmailAndPassword(values.email, values.password)

      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      this.isLoggedIn = true
    }
  }
})
