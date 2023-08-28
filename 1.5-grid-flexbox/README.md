# Grid and Flexbox Responsive Layouts

## Flexbox

Flexible boxes.

| Advantages                                     | Disadvantage                                   |
| ---------------------------------------------- | ---------------------------------------------- |
| The first layout elements                      | Wasn't designed to be locked down for layouts! |
| Excels at vertical centering and equal heights | Works in 1 dimension only                      |
| Very easy to reorder boxes                     |

Flex container has 2 axis, the __main axis__ and the __cross axis__. The __main axis__ is the same as the primary direction defined for the flexbox contianer.

Use `flex-basis` instead of width to make a children change its width based on the flexbox container width. The `width` property won't work if the parent has defined `width`.

## Flexbox Grid System

Define how many boxes you allow and the space between them. Create helper clases when you need certain item to fill a space. Always use the `flex-basis` property to define exactly the percentage for your column span.
