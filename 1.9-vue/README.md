# Vue

## Directives

`v-cloak`: Will change `display: none;` to `display: block` when Vue is loaded.

`v-model`: Two way bidning reactivity.

`v-bind:[attribute]`: Binding Attributes. Bind HTML attributes to Vue. e.g. `v-bind:href="url"`. Shortant `:href="url"`.

### `v-show` vs `v-if`:

Use `v-show` if the elements will constantly appear/disappear on the page.

Use `v-if` if the elements will appear/disappear occasionally, or rarely.

## Lifecycle

1. `let vm = Vue.createApp({}).mount()`
2. `beforeCreate` hook
3. Initilize data and methods
4. Instance Created -> `created` hook
5. Compile Template (el Property)
6. `beforeMount` hook
7. Replace el property with compiled template
8. Mounted -> `mounted` hook
9. Data Changes
10. `beforeUpdate` hook
11. Apply changes to the template
12. `updated` hook
13. Repeat from step 9
14. `vm.unmount()`
15. `beforeUnmount` hook
16. Vue instance destroyed -> `unmounted` hook

Any time `vm.unmount()` is called Vue is destroyed and the loop over step 9 is broken.

https://vuejs.org/guide/essentials/lifecycle.html

## PWA

Progresive Web Apps. They are an extension for web applications inlcuding some mobile features.

* Open From Home
* Offline Support
* Background Sync
* Push Notification
* Access to Hardware
* Geolocation

There are three characteristics:

* Capable: Camera, Notifications, Geolocation
* Reliable: Perform actions that would require internet without it
* Installable: The use can install the application on their devices

https://web.dev/install-criteria/

## Options API vs Composition API

Composition API offers:

* Better TypeScript Support
* Better Organization
* Better Reusability

## Design Patterns

### Controlled Components

* A components that outputs an input for a form
* Doesn't have it's own state
* Relies on the parent component for data
* Emits an event when the user attempts to change the input

https://vuejs.org/guide/components/v-model.html

`v-model` is expanded as follows:

```vue
<CustomInput
  :modelValue="searchText"
  @update:modelValue="(newValue) => (searchText = newValue)"
/>
```

The component that receives `v-model` should be define as follows:

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

### Separation of Concerns

Separate different types of logic to achieve reusable code

UI Logic: Refers to the code inside the template block

Business Logic: Refers to code that handles the data

### Teleport

Vue provides a teleport component. This component allows to keep components hierarchy while rendering the contents into another child of the document.

```vue
<Teleport to="body">
  <h1>Hello world</h1>
</Teleport>
```
