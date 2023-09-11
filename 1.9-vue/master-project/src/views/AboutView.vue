<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AboutView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    console.log(route.params)

    router.push({
      hash: '#test'
    })
  }
}
</script>

<template>
  <main>
    <h1>About</h1>
    <p>{{ $route.params.member }}</p>
    <base-button></base-button>
  </main>
</template>
