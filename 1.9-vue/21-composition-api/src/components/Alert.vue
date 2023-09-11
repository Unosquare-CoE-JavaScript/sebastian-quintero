<script>
import { computed } from 'vue'

export default {
  name: 'AppAlert',
  props: ['user'],
  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    // context.emit('eventName', {})

    const flag = computed(() => {
      return props.user.name === 'John'
    })

    return {
      flag
    }
  }
}
</script>

<template>
  <div v-if="!flag" style="color: red">Name Changed!</div>
</template>
