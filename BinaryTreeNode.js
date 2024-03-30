class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }

  getHeight() {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    return 1 + Math.max(leftHeight, rightHeight);
  }
}

export default BinaryTreeNode;
