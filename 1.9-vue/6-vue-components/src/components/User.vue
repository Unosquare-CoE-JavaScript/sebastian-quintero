<script>
const EVENT_AGE_CHANGE = "age-change";

const INCREMENT_BY = 5;

export default {
  name: "User",
  props: ["age"],
  emits: [EVENT_AGE_CHANGE],
  methods: {
    onClickAge() {
      this.$emit(EVENT_AGE_CHANGE, INCREMENT_BY);
    },
  },
};
</script>

<template>
  <button @click="onClickAge">Update Age</button>
  <p>The user is {{ age }} years old</p>
</template>
