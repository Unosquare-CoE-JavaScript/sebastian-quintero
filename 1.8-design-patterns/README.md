# Design Patterns

## SOLID

Set of design principles frequently referenced in design principles literature.

### Single Responsability Principle - SRP

One sigle responsability and separation of concerns. Every class should only have to do one thing. e. g. A collection and persistence, one aims to store a reference for a group of values an the other is about storage and restore after the program exits.

* A class should only have one reason to change
* Separation of concers: different classes handling different, independent tasks/problems.

### Open-Closed Principle - OCP

One of the classic enterprise patterns. Modification is making changes to already existing code. Extension is actual class inheritance, new classes that are adding functionality without modifying what it exists before.

* Classes should be open for extension bu closed for modification

### Liskov Substitution Principle - LSP

Don't break if a subclass is provided. If a method receives the base class, the function should work as expected for every subclass.

* You should be able to substitute a base type for a subtype

### Interface Segregation Principle - ISP

Split up interfaces into different parts so the consumers only get what they would need. In fact, only the methods for the specific functionality should be define in the interface.

* Don't put too much into an interface; split into separate interfaces
* YAGNI - You Ain't Going to Need It

### Dependency Inversion Principle - DIP

It is not related to "dependendy injection", "dependency injection" is a effect of the dependency inversion principle instead. High level modules should not directly depend on low level modules. The low level implementation should provide an abstraction over the implementation details (encapsulation) so the high level classes can use it without known about its implementation.

* High-level modules should not depend upon low-level ones; use abstractions

## Gamma Categorization

### Creational Patterns

* Deal with the creation (construction) of objects
* Explicit (constructor) vs. implicit (DI, reflection, etc.)
* Wholesale (single statement) vs. piecewise (step-by-step)

### Structural Patterns

* Concerned with the structure (e.g.m class members)
* Many patterns are wrappers that mimic the underlying class' interface
* Stress the importance of good API design

### Behavioral Patterns

* They are all different; no central theme

## Builder

> When piecewise object construction is complicated, provide an API for doing it succinctly.

It is used for complex object creation, lots of constructor parameters or complex initialization. Builders that returns `this` are _fluent_ allowing for chaining the object properties.

```js
const html = new HtmlBuilder('ul')
    .addTag('li')
    .addChild('text')
    .build(); // <ul><li>text</li></ul>
```

## Factory

> A component responsible solely for the wholesale (not piecewise) creation of objects.

A method or a class that instantiates another class which contains the data. As a class exposes methods for the different variants for the object its creating. Abstract factories doesn't separate by methods but keep an internal mapping to the different classes instead.

```js
const catesian = PointFactory.newCartesian(x, y);
const polar = PointFactory.newPolar(r, theta);
```

### Prototype

> A partially or fully initialized object that you copy (clone) and make use of.

Prototype is a set of object's properties that can be cloned into another object so the new object is fully customizable without modifying the original one.

### Singleton

> A component which is instantiated only once.

Global reference to a class' instance encapsulated within the class. It uses a method that instantiates only once and then return that instance for subsequent invokations.

⚠️ Warning: Dependency is a better approach rather than singleton.

### Adapter

> A construct which adapts an existing interface X to conform to the required interface Y.

Create a new object which aggregates the adaptee.

### Bridge

> A mechanism that decouples an interface (hierarchy) from an implementation (hierarchy).

Stronger form of encapsulation. It decouples abstraction from implementation and allows communication between multiple inheritances.

### Composite

> A mechanism for treating individual (scalar) objects and compositions of objects in a uniform manner.

An object that is like a single object when use externaly and can act like a collection for internal use. Treat individual objects as well as aggregated objects in a uniform fashion.
