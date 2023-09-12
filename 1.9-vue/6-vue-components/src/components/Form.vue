<script>
export default {
  name: "AppForm",
};
</script>

<template>
  <form>
    <div class="help">
      <slot name="help"></slot>
    </div>
    <div class="fields">
      <slot>Empty form</slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </form>
</template>
