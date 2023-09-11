<script setup>
import { ref } from 'vue'

const props = defineProps(['initialValue'])

const counter = ref(props.initialValue ?? 0)

function increment() {
  counter.value++
}

function decrement() {
  counter.value--
}
</script>

<template>
  <div>
    <button @click="decrement">-</button>

    <span>{{ counter }}</span>

    <button @click="increment">+</button>
  </div>
</template>
