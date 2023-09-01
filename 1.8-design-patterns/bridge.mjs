import { strictEqual } from "node:assert";

class Renderer {
  render(shape) {
    return `Not implemented yet.`;
  }
}

class VectorRenderer extends Renderer {
  render(shape) {
    return `Drawing ${shape} points`;
  }
}

class RasterRenderer extends Renderer {
  render(shape) {
    return `Drawing ${shape} as pixels`;
  }
}

class Shape {
  constructor(renderer) {
    this._renderer = renderer;
  }

  toString() {
    return this._renderer.render("shape");
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super(renderer);
  }

  toString() {
    return this._renderer.render("triangle");
  }
}

class Rect extends Shape {
  constructor(renderer) {
    super(renderer);
  }

  toString() {
    return this._renderer.render("rect");
  }
}

const vectorRenderer = new VectorRenderer();
const rasterRenderer = new RasterRenderer();

const triangle = new Triangle(vectorRenderer);
const rect = new Rect(rasterRenderer);

strictEqual(triangle.toString(), "Drawing triangle points");
strictEqual(rect.toString(), "Drawing rect as pixels");
