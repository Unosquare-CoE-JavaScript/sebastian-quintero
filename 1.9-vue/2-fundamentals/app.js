// Doesn't work outside of view data
const lastName = "Doe";

const vm = Vue.createApp({
  data() {
    return {
      firstName: "John",
    };
  },
  methods: {
    fullName() {
      return `${this.firstName} ${lastName}`;
    },
  },
}).mount("#app");

setTimeout(() => {
  // Proxy to vm.$data.firstName
  vm.firstName = "Bob";
}, 2000);

/** App 2 */
// Muti-instance
Vue.createApp({
  data() {
    return {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      url: "https://google.com",
      rawUrl: '<a href="https://google.com">Google</a>',
      rawHtml: '<a href="https://google.com">Google</a>',
      age: 20,
    };
  },
  methods: {
    increment() {
      this.age++;
    },

    updateMiddleName(event) {
      this.middleName = event.target.value;
    },

    updateLastName(message, event) {
      console.log(message);
      this.lastName = event.target.value;
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    },
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 20;
      }, 3000);
    },
  },
}).mount("#app-2");

/** App 3 */
Vue.createApp({
  data() {
    return {
      isPurple: false,
      selectedColor: "",
      size: 150,
    };
  },
  computed: {
    circleClasses() {
      return { purple: this.isPurple };
    },
    circleStyles() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        lineHeight: `${this.size}px`,
      };
    },
  },
}).mount("#app-3");

/** App 4 */
Vue.createApp({
  data() {
    return {
      mode: 1,
    };
  },
}).mount("#app-4");

/** List */
Vue.createApp({
  data() {
    return {
      birds: ["Pigeons", "Eagles", "Doves", "Parrots"],
      people: [
        { name: "John", age: 20 },
        { name: "Rick", age: 18 },
        { name: "Amy", age: 33 },
      ],
    };
  },
}).mount("#list");

/** Card */

Vue.createApp({
  data() {
    return {
      people: [
        { name: "John", message: "Hello world!" },
        { name: "Rick", message: "I like pie." },
        { name: "Amy", message: "Skydiving is fun!" },
      ],
    };
  },
  methods: {
    move() {
      const first = this.people.shift();
      this.people.push(first);
    },
  },
}).mount("#card");
