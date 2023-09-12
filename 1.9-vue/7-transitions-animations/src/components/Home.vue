<script>
export default {
  unmounted() {
    console.log("Home Unmounted");
  },
  activated() {
    console.log("Home activated");
  },
  deactivated() {
    console.log("Home deactivated");
  },
};
</script>

<template>
  <h1>Home</h1>
</template>
