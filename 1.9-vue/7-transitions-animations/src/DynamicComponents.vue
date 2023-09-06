<script>
import Home from "./components/Home.vue";
import About from "./components/About.vue";

export default {
  name: "DynamicComponents",
  components: {
    Home,
    About,
  },
  data() {
    return {
      componentName: "Home",
    };
  },
};
</script>

<template>
  <select v-model="componentName">
    <option value="Home">Home</option>
    <option value="About">About</option>
  </select>

  <!-- Dynamic Component -->
  <!-- Everythin inside keep-alive will keep in memory instead of being unmounted -->
  <keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
</template>

<style scoped></style>
