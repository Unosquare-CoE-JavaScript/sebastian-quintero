<script>
export default {
  name: "Questions",
  props: ["questions", "questionsAnswered"],
  emits: ["question-answered"],
  methods: {
    selectAnswer(isCorrect) {
      this.$emit("question-answered", isCorrect);
    },
  },
};
</script>

<template>
  <div class="questions-ctr">
    <div class="progress">
      <div
        class="bar"
        :style="{ width: `${(100 * questionsAnswered) / questions.length}%` }"
      ></div>
      <div class="status">
        {{ questionsAnswered + 1 }} out of {{ questions.length }} questions
        answered
      </div>
    </div>
    <TransitionGroup name="fade">
      <div
        class="single-question"
        v-for="(question, qi) in questions"
        :key="question.q"
        v-show="questionsAnswered === qi"
      >
        <div class="question">{{ question.q }}</div>
        <div class="answers">
          <div
            class="answer"
            v-for="answer in question.answers"
            :key="answer.text"
            @click.prevent="selectAnswer(answer.is_correct)"
          >
            {{ answer.text }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
