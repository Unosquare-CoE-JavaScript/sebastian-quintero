<script>
export default {
  name: "App",
  data() {
    return {
      flag: false,
      numbers: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    addItem() {
      const num = Math.floor(100 * Math.random() + 1);
      const index = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(index, 0, num);
    },
    removeItem(index) {
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      console.log("before-enter", el);
    },
    enter(el, done) {
      console.log("enter", el);

      const animation = el.animate([{ transform: "scale3d(0,0,0)" }, {}], {
        duration: 1000,
      });

      animation.onfinish = () => {
        done();
      };
    },
    afterEnter(el) {
      console.log("after-enter", el);
    },
    beforeLeave(el) {
      console.log("before-leave", el);
    },
    leave(el, done) {
      console.log("leave", el);

      const animation = el.animate([{}, { transform: "scale3d(0,0,0)" }], {
        duration: 1000,
      });

      animation.onfinish = () => {
        done();
      };
    },
    afterLeave(el) {
      console.log("after-leave", el);
    },
  },
};
</script>

<template>
  <button @click="flag = !flag">Toggle</button>
  <Transition name="fade" mode="out-in">
    <h2 v-if="flag" key="main">Hello world</h2>
    <h2 v-else key="secondary">Another hello</h2>
  </Transition>

  <transition name="zoom">
    <h2 v-if="flag">CSS Keyframes</h2>
  </transition>

  <Transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
  >
    <h2 v-if="flag">Javascript</h2>
  </Transition>

  <button @click="addItem">Add</button>

  <ul>
    <!-- 

      enter-from-class=""
      enter-active-class=""
      enter-to-class=""
      leave-from-class=""
      leave-active-class=""
      leave-to-class=""

     -->
    <TransitionGroup
      name="fade"
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX"
    >
      <li
        v-for="(number, index) in numbers"
        :key="number"
        @click="removeItem(index)"
      >
        {{ number }}
      </li>
    </TransitionGroup>
  </ul>
</template>

<style scoped>
li {
  font-size: 24px;
  cursor: pointer;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}

.fade-move {
  transition: all 0.25s linear;
}

.fade-leave-active {
  position: absolute;
}

.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
}

.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
}

@keyframes zoom-in {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
</style>
