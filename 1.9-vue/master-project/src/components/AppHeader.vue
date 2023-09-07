<script>
import { mapStores, mapWritableState } from 'pinia'
import { useModalStore } from '../stores/modal'
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    // maps only properties but works the same as above
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    toggleAuthModal() {
      // mapStores
      // this.modalStore.isOpen = !this.modalStore.isOpen
      this.isOpen = !this.isOpen
    },
    async signOut() {
      await this.userStore.signOut()

      // Check for name is not scalable
      // if (this.$route.name === 'manage') {
      if (this.$route.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  components: { RouterLink }
}
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </RouterLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <RouterLink class="px-2 text-white" to="/about">About</RouterLink>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.isLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" to="/manage">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>
