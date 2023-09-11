<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, toRefs, watchEffect, watch, computed, onBeforeMount, onMounted } from 'vue'
import Alert from './components/Alert.vue'

export default {
  name: 'App',
  setup() {
    // template reference
    const btn = ref(null)

    onBeforeMount(() => {
      console.log('onBeforeMount()')
    })
    onMounted(() => {
      console.log('onMounted')

      btn.value.addEventListener('click', () => {
        console.log('Button was clicked')
      })
    })

    // reactive reference
    // ref for primitive values
    let num = ref(0)
    function increment() {
      // access by value
      num.value++
    }
    const double = computed(() => {
      return 2 * num.value
    })
    // reactive for objects
    const user = reactive({
      // direct access
      name: 'John',
      age: 20
    })
    setTimeout(() => {
      user.name = 'Luis'
    }, 3000)
    const phrase = ref('')
    const reversedPhrase = ref('')
    watchEffect(() => {
      reversedPhrase.value = phrase.value.split('').reverse().join('')
    })
    // watch(phrase, (newVal, oldVal) => {
    // watch([phrase], ([newVal, oldVal]) => {
    //   reversedPhrase.value = phrase.value.split('').reverse().join('')
    // })
    return {
      btn,
      num,
      increment,
      user,
      // ...toRefs(user),
      phrase,
      reversedPhrase,
      double
    }
  },
  components: { Alert }
}
</script>

<template>
  <h1>App</h1>
  <div>
    <p>2 * {{ num }} = {{ double }}</p>
    <button type="button" @click.prevent="increment">Increment</button>

    <p>{{ user.name }}</p>

    <p>
      <input type="text" v-model="phrase" />
    </p>
    <p>{{ reversedPhrase }}</p>
  </div>

  <div>
    <Alert :user="user" />
  </div>

  <button ref="btn">Button</button>
</template>
