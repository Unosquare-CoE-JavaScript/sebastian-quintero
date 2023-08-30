# Unit Testing

## TDD - Test-Driven Development

Write the test before writing code, then write code to make the test pass.

"red-green" testing: Tests fail before code is written.

Steps:

1. Create a test that fails.
2. Create the actual code to make the test pass.
3. Refactor the code.
4. Start again from the step 1.

## BDD - Behavior-Driven Development

* Involves collaboration between lots of roles: developers, QA, bussiness partners, etc.
* Defines process for different group to interact.

## Types of Tests

__Unit tests__: tests one unit of code in isolation.

* Mock dependencies
* Test internals
+ 👍 Very easy to pinpoint failures
- 👎 Further from how users interact with software
- 👎 More likely to break with refactoring

__Integration tests__: tests how multiple units work together.

__Functional tests__: tests a particular function/behavior of software. You are not testing code, you are testing behavior.

* Include all relevant units
* Test behavior
+ 👍 Close to how users interact with software
+ 👍 Robust tests
- 👎 More difficult to debug failing tests

__Acceptance / End-to-end (E2E) Tests__: use actual browser and server.

## React Testing Library

This library creates a virtual DOM and a set of functions to interact with.

### Which query should I use?

https://testing-library.com/docs/queries/about#priority

### Definition of Roles

https://www.w3.org/TR/wai-aria/#role_definitions

### Log Available Roles

To log available roles for the current rendered component `logRoles` function is used.
