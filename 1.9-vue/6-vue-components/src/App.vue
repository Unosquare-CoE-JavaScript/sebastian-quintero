<script>
import Greeting from "./components/Greeting.vue";
import User from "./components/User.vue";
import AppForm from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Greeting,
    User,
    AppForm,
  },
  data() {
    return {
      age: 20,
    };
  },
  methods: {
    updateAge(increment) {
      this.age += increment;
    },
    logCallback() {
      console.log("called");
    },
  },
};
</script>

<template>
  <h3>Hey</h3>

  <button @click="age++">Increment Age</button>

  <!-- Allows lower case and capital case -->
  <greeting :age="age" :callback="logCallback"></greeting>

  <User :age="age" @age-change="updateAge"></User>

  <app-form>
    <label>
      <input type="email" placeholder="email" />
    </label>
    <label>
      <input type="text" placeholder="user" />
    </label>
    <label>
      <input type="password" placeholder="password" />
    </label>
  </app-form>

  <AppForm></AppForm>

  <AppForm>
    <template v-slot:help>
      <p>Contact Form</p>
    </template>

    <label>
      <input type="email" placeholder="email" />
    </label>

    <template v-slot:actions>
      <button>Submit</button>
    </template>
  </AppForm>
</template>

<style></style>
