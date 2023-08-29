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

## Responsive Images

`<picture>`: Displays what you want a certain size.

```html
<picture>
    <source
        src="..."
        media="(min-width: 850px)"
    >
    <img
        src="..."
        alt="..."
    >
</picture>
```

There are media queries for responsive images. `(orientation: landscape)` means the width is larger than height. `(orientation: portrait)` means the height is larger than width.

`srcset` and `sizes`: The browser decides which image displays.
```html
<img src="small.jpg"
    srcset="large.jpg 1024w,
        medium.jpg 640w,
        small.jpg 320w"
    sizes="(min-width: 36em) 33.3vw, 100vw"
    alt="..." />
```

`(min-width: 36em) 33.3vw, 100vw`: Size of the hole on the web page. If the `min-width` is at least `36em`, display the image at `33.3vw`. Otherwise, display the image at `100vw`.

| picture                                                                 | src,srcset                                                              |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Image optimized for content reasons matters more than technical reasons | Image optimized for technical reasons matters more than content reasons |
| Author chooses the best image                                           | Browser chooses the best image                                          |
| Images may be very different in composition and dimension               | Images vary in dimension but not composition                            |

Useful link for creating responsive images: https://responsivebreakpoints.com/

Tip: To make the images responsive and prevent a jump between different dimensions use `max-width` and `max-height` to define the `<img>` behaivor. e. g.
```css
img {
    max-width: 100%; /* Fill the parent element */
    max-height: 454px; /* Browser will keep the aspect ratio when "height = 454px" is reached */
}
```

## CSS Grid

It's a 2D layout system allowing you to place items based on rows and columns.

A good practice for placing and defining rows and columns for a grid container is to count spaces and use `grid-row` and `grid-column` on the children accordingly. e. g.

```css
/* |_|___|
 * |_|_|_|
 */

.container {
    display: grid;
}

.at-1-1 {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
}

.at-1-2 {
    grid-row: 1 / 2;
    grid-column: 2 / 4;
}

.at-2-1 {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
}

.at-2-2 {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}

.at-2-3 {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
}
```

`grid-template-columns` and `grid-template-rows` are container properties to define the dimensions of the elements within the container.

The `span` value allows to fill many rows or columns for `grid-row` and `grid-column`.
