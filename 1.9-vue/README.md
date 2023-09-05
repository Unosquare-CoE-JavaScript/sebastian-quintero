# Vue

## Directives

`v-cloak`: Will change `display: none;` to `display: block` when Vue is loaded.

`v-model`: Two way bidning reactivity.

`v-bind:[attribute]`: Binding Attributes. Bind HTML attributes to Vue. e.g. `v-bind:href="url"`. Shortant `:href="url"`.

### `v-show` vs `v-if`:

Use `v-show` if the elements will constantly appear/disappear on the page.

Use `v-if` if the elements will appear/disappear occasionally, or rarely.
