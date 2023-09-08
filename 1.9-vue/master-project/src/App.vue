<script>
import { mapWritableState } from 'pinia'
import AppAuth from './components/AppAuth.vue'
import AppHeader from './components/AppHeader.vue'
import { useUserStore } from './stores/user'
import { auth } from './includes/fake-server'
import { RouterView } from 'vue-router'
import AppPlayer from './components/AppPlayer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    RouterView,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, {
      userIsLoggedIn: 'isLoggedIn'
    })
  },
  created() {
    if (auth.currentUser) {
      this.userIsLoggedIn = true
    }
  }
}
</script>

<template>
  <AppHeader></AppHeader>

  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>

  <AppPlayer />

  <AppAuth></AppAuth>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
