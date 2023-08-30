# SASS

| CSS                                        | Preprocesser                |
| ------------------------------------------ | --------------------------- |
| No encapsulation                           | Compile to CSS              |
| * No variables                             | Parameterized (variables)   |
| Not composable                             | Composable                  |
| Bad modularity primitives                  | Modular                     |
| Globals                                    | Plug in your existing tools |
| Beating-into-submission-driven-development |                             |

(*) CSS supports variables in a form of "custom properties" since 2017 for all major browsers.

## Nesting & Scoping

Allows nesting the child selectors.

```scss
.container {
    .sidebar,
    .main {
        /* 1 */
    }

    .sidebar {
        /* 2 */
    }

    .main {
        /* 3 */
    }
}
```

## Parent Selector (&)

SASS uses the `&` symbol as parent selector.
```scss
.button {
    .theme-dark & {
        /* will change when button is child of theme, aka: .theme-dark .button */
    }
}
```

## Importing

Importing in CSS makes a new HTTP request. Importing in SASS does a different stuff.

Partials: Files starting with undersocre. These files are no compiled into CSS files but included into the ones whic are compiled.

## Variables

Variables are declare using `$` as the first character of the variable and `:` to define its value. `!default` means "unless set elsewhere".

```scss
$error_color: #f00 !default; /* global variable */

.alert-error {
    $text-color: #ddd; /* local variable */
    background-color: $error-color;
    color: $text_color;
    text-shadow: 0 0 2px darken($text_color, 40%);
}
```

## Mixins

The primary way of reusing styles in SASS. Declaration block is merged, by way of `@include`. Mixins support arguments too.

```scss
@mixin alert-text {
    background-color: #f00;
    color: white;
    font-variant: small-caps;
}

@mixin alert-with-args($color) {
    background-color: $color;
}

.error-text {
    @include alert-text;
}

.has-error:after {
    @include alert-text;
    display: inline-block;
}

.error-text {
    @include alert-text(blue);
}

.has-error:after {
    @include alert-text(red);
}
```

Mixins support default argument values so the declaration would include a value. A `null` default value will omit the entire property.

```scss
@mixin alert-text($color: #f33, $opacity: null) {
    background-color: $color;
    opacity: $opacity;
}

h1 {
    /* will apply 0.8 as opacity */
    @include alert-text(blue, 0.8);
}

h2 {
    /* arguments by name, this call ignores the order */
    /* will ignore the opacity */
    @include alert-text($color: green);
}

h3 {
    /* default value will be applied for $color */
    /* will ignore the opacity */
    @include alert-text;
}
```

Mixins support passing a declaration blocks. You can define what mixin will include within by using the `@content` keyword.

```scss
@mixin foo($color) {
    color: $color;
    .inner {
        @content;
    }
}

.btn {
    /* it will generate a .inner class with color: red */
    @include foo(#c69) {
        color: red;
    }
}
```

## Functions

SASS provides a set of functions to modify the colors https://sass-lang.com/documentation/modules/.

## Data Structures

### Lists

Values separated by spaces or commas. e. g. `$list: 0 0 2px #000;`

The `nth` function takes an specifi value from a list.

```scss
/* parenthesis and comma are groups and separators for lists */
$gradients:
    (to left top, blue, red), /* first item in the list */
    (to left top, blue, yellow) /* second item in the list */;

.foo {
    background: linear-gradient(nth($gradients, 2)); /* (to left top, blue, yellow) */
}
```

## Control Flow

`@if`

```scss
@mixin foo($size) {
    font-size: $size;
    @if $size > 20 {
        line-height: $size;
    }
}

.small {
    /* it will ignore line-height */
    @include foo(14px);
}

.larget {
    /* it will include line-height */
    @include foo(24px);
}
```

`@for`: range iteration. Ranges are define as `from [start] through [end]`

```scss
@for $i from 1 through 5 {
    /* string interpolation #{} */
    /* will produce h1, h2, h3, h4, h5 */
    h#{$i} {
        font-size: 5rem - $i * 0.75rem;
    }
}
```

`@each`: list iteration.

```scss
$list: 0 0 2px #000;

.foo {
    @each $i in $list {
        /* #{$i} */
    }
}
```

## BEM

__Block__: standalone enity, meaningful on its own. e. g. header, container, menu, checkbox, input, button.

__Element__: A part of a block that has no standalone meaning, and is semantically tied to its block. e. g. menu-item, list-item, checkbox-caption, header-title.

__Modifier__: A flag on a block or element, used to change appearance and/or behavior. e. g. disabled, highligted, checked, size-big, color-yellow.

```html
<div class="textfield">
    <label for="first-name" class="textfield__label">
        First name
    </label>
    <input name="first-name" type="email" class="textfield__input" />
    <span class="textfield__validation-error">

    </span>
</div>
```

```scss
/* block */
.textfield {
    /* element */
    &__input { }
    &__label { }
    &__validation-error { }

    /* modifier */
    &.textfield--state-error { }
    &.textfield--state-validated { }
}
```

`@extend` keyword allows to reuse styles the same way as a `@include` with mixins but it does not duplicate the styles and generate share CSS instead.

```scss
/* placehoder starts with '%' */
/* a placeholder does not generate CSS class */
/* it could be a .danger class */
%danger {
    background-color: red;
    color: white;
}

.btn-danger {
    @extend %danger;
    padding: 2px;
}

.alert-danger {
    @extend %danger;
    width: 100%;
}
```

```css
/* .danger class would be generated if a class was used instead of a placeholder */
/* .danger */
.btn-danger,
.alert-danger {
    background-color: red;
    color: white;
}

.btn-danger {
    padding: 2px;
}

.alert-danger {
    width: 100%;
}
```

Alert: Use `@extends` cautiously because it can generate a lot of CSS garbage.
