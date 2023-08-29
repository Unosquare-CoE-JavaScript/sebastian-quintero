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
