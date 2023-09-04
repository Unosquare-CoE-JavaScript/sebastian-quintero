class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  *preorder() {
    yield this.value;

    if (this.left != null) {
      for (let leftValue of this.left.preorder()) {
        yield leftValue;
      }
    }

    if (this.right != null) {
      for (let rightValue of this.right.preorder()) {
        yield rightValue;
      }
    }
  }
}
