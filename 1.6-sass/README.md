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
