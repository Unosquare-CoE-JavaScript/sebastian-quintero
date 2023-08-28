# Functional Programming

"Programming with functions"

## Pure functions

Every function is a single-valued collection of pairs.

Rules:

* For every input there is a corresponding output
* Always receive the same output for a given input
* No observable effects besides computing a value

### Why?

* Reliable
* Portable
* Reusable
* Testable
* Composable
* Properties/Contract

## Currying

Transform a function into single argment call. You'd want something you want to remember at the very beginning positions and the data for the function at the end.

## Composition

It's an associative operation, so the order of composition doesn't matter.

When combining with currying, you can convert any function into a unary function, so it can be composed.
