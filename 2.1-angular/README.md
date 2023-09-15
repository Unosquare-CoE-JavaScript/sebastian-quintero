# Angular

## Responsabilities Segregation

`.component.html`: Template files that will render the component.
`.component.ts`: Controller defines the data for the component.

## Angular Concepts

`module`: A module is a set of components/pipes/directives.

`component`: A component are the files used to render and process the UI. The `.html` file is the view part. The `.ts` file is the controller part. The `.css`/`.scss` is the style scoped to the `.html`.

`directive`: An attribute that could be added to any element. e.g. `<input matInput>` will insert the Material UI styles to the input.

`pipe`: An operation for the string interpolation values. e.g. `<span>{{ balance | currency: 'USD' }}</span>` will format the `balance` number as US dollars.

## NG CLI Commands

Most of the `ng` commands have a `shorthand` form. e.g. `ng generate` is equivalent to `ng g`. The folder within the app folder can be declared for every command: `ng g <command> [path/][subpath/][name]`.

`ng generate component [name]`: Create a component called "name" and add it to the `AppModule` by default. Shorthand: `ng g c [name]`.

`ng generate service [name]`: Create a service called "name" with the `@Injectable` decorator. Shorthand: `ng g s [name]`.

`ng generate pipe [name]`: Create a pipe called "name" and add it to the `AppModule` by default. A pipe can be used for string interpolation in the `.html` files. Shorthand: `ng g p [name]`.

`ng generate directive [name]`: Create a directive called "name" and add it to the `AppModule` by default. Shorthand: `ng g d [name]`.

## Angular Forms

https://angular.io/guide/reactive-forms#reactive-forms

### Validation

https://angular.io/guide/form-validation
