let vm = Vue.createApp({
  data() {
    return {
      message: "Hello world!",
    };
  },
  beforeCreate() {
    console.log("beforeCreate() called", this.message);
  },
  created() {
    console.log("created() called", this.message);
  },
  beforeMount() {
    console.log("beforeMount() called", this.$el);
  },
  mounted() {
    console.log("mounted() called", this.$el);
  },
  beforeUpdate() {
    console.log("beforeUpdate() called");
  },
  updated() {
    console.log("updated() called");
  },
  beforeUnmount() {
    console.log("beforeUnmount() called");
  },
  unmounted() {
    console.log("unmounted() called");
  },
});

/** Components */
vm.component("blog-post", {
  template: `<h1>{{ message }}</h1>`,
  data() {
    return {
      message: "Hello world! from component",
    };
  },
});

setTimeout(() => {
  vm.mount("#app");
}, 1000);

/** Templates */
Vue.createApp({
  data() {
    return {
      message: "Hello world!",
    };
  },
  template: `{{ message }}`,
});

/** Compiler */
console.log(Vue.compile(`<p v-if='true'>Hello</p>`));

/** Render method */
Vue.createApp({
  data() {
    return {
      message: "Hello world!",
    };
  },
  render() {
    return Vue.h("h1", this.message);
  },
});
