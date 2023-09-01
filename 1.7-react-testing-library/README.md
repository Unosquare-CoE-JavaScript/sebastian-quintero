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

### Unit tests: tests one unit of code in isolation.

* Mock dependencies
* Test internals
+ 👍 Very easy to pinpoint failures
- 👎 Further from how users interact with software
- 👎 More likely to break with refactoring

__When to Unit Test?__ For complicated functions with many edge cases. unit tests help with determining what cause functional tests to fail.

### Integration tests

Tests how multiple units work together.

### Functional tests

Tests a particular function/behavior of software. You are not testing code, you are testing behavior.

* Include all relevant units
* Test behavior
+ 👍 Close to how users interact with software
+ 👍 Robust tests
- 👎 More difficult to debug failing tests

### Acceptance / End-to-end (E2E) Tests

Use actual browser and server.

## React Testing Library

This library creates a virtual DOM and a set of functions to interact with.

### Which query should I use?

https://testing-library.com/docs/queries/about#priority

### Definition of Roles

https://www.w3.org/TR/wai-aria/#role_definitions

### Log Available Roles

To log available roles for the current rendered component `logRoles` function is used.

```jsx
import { logRoles, render } from "@testing-library/react";

const { container } = render(<Button />);
logRoles(container);
```

### Asynchronous

Use `findBy` methods to access elements that could have an asyncrhonous behavior.

Use `waitFor` to prevent raise conditions. Sometimes a set of asynchronous tasks could be resolved a different times between different machines. If you are expecting all asynchronous behavior to be resolved right the way, probably one or many of those could not finish at a time. `waitFor` allows to wait until the condition is met or a timeout happen.

### Custom Render

When a context is needed in order to make the componets work a custom renderer could be created to be shared between the test that would need it.

```jsx
import { render } from '@testing-library/react';

function AllProviders = ({ children }) {
    return (
        <ThemeProvider>
            <ReduxContext.Provider>
                <CustomContext.Provider>
                    {children}
                </CustomContext.Provider>
            </ReduxContext.Provider>
        </ThemeProvider>
    );
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Mocks as Props

When a function is called in the tests, but doesn't matter for test. Hypothetical: context updater passed as a prop.

`jest.fn()` or `vi.fn()`:
* Mock function
* Does not do anything
* Merely a placeholder to avoid errors

### Standard Questions to Ask

* What to render?
    * What's the smallest component that encompasses tests?
* Do we need to pass any props?
* Do we need to wrap in, say, `Context.Provider`?
    * Does the provider get used? Is it already wrapped within the component?
* Where should the tests go?
    * which file?
* What to test?
    * What's the behavior that needs testing?
* How to test?
    * What queries and events?
* Should we `await`?
    * Is there any `async` task?