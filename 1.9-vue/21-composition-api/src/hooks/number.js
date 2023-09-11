import { computed, isReactive, isRef, reactive, ref } from 'vue'

// Composition Function
export function useNumber() {
  let num = ref(0)
  const accounts = reactive({
    checking: 3242,
    savings: 242
  })

  console.log('isRef(num)', isRef(num))
  console.log('isReactive(accounts)', isReactive(accounts))

  function increment() {
    num.value++
  }

  const double = computed(() => {
    return 2 * num.value
  })

  return { num, increment, double }
}
