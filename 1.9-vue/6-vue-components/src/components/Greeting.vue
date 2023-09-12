<script>
export default {
  name: "Greeting",
  props: {
    age: {
      type: Number,
      required: true,
      validator(value) {
        return value < 130;
      },
    },
    userName: {
      type: [String],
      default: "World",
    },
    callback: {
      type: Function,
    },
  },
  data() {
    return {
      message: `Hello ${this.userName}!`,
    };
  },
};
</script>

<template>
  <button @click="callback">Callback</button>
  <p v-if="age > 25">{{ message }}</p>
  <p v-else>You must be older than 25 to see the message</p>
</template>

<!-- Scoped is like CSS modules -->
<style scoped lang="scss">
p:hover {
  color: darken(#c44, 15%);
}
</style>
