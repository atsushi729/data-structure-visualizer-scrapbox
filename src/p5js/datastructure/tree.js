let tree;
let input, addButton, deleteButton, searchButton;
let searchValue = null;
let foundNode = null;
const NODE_RADIUS = 20;

function setup() {
  createCanvas(800, 600);
  tree = new Tree();

  input = createInput();
  input.position(20, height + 5);

  addButton = createButton("Add Node");
  addButton.position(input.x + input.width + 5, height + 5);
  addButton.mousePressed(addNode);

  deleteButton = createButton("Delete Node");
  deleteButton.position(addButton.x + addButton.width + 5, height + 5);
  deleteButton.mousePressed(deleteNode);

  searchButton = createButton("Search Node");
  searchButton.position(deleteButton.x + deleteButton.width + 5, height + 5);
  searchButton.mousePressed(searchNode);
}

function draw() {
  background(255);
  tree.display();

  if (searchValue !== null) {
    fill(0);
    textSize(16);
    if (foundNode) {
      text(`Node ${searchValue} found`, 20, height - 20);
    } else {
      text(`Node ${searchValue} not found`, 20, height - 20);
    }
  }
}

function addNode() {
  const value = parseInt(input.value());
  if (!isNaN(value)) {
    tree.addNode(value);
    input.value("");
    searchValue = null;
    foundNode = null;
  }
}

function deleteNode() {
  const value = parseInt(input.value());
  if (!isNaN(value)) {
    tree.removeNode(value);
    input.value("");
    searchValue = null;
    foundNode = null;
  }
}

function searchNode() {
  searchValue = parseInt(input.value());
  if (!isNaN(searchValue)) {
    foundNode = tree.search(searchValue);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  addNode(newNode) {
    if (newNode.value < this.value) {
      if (this.left === null) {
        this.left = newNode;
      } else {
        this.left.addNode(newNode);
      }
    } else {
      if (this.right === null) {
        this.right = newNode;
      } else {
        this.right.addNode(newNode);
      }
    }
  }

  removeNode(value, parent) {
    if (value < this.value) {
      if (this.left !== null) {
        return this.left.removeNode(value, this);
      }
    } else if (value > this.value) {
      if (this.right !== null) {
        return this.right.removeNode(value, this);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        this.value = this.right.minValue();
        this.right.removeNode(this.value, this);
      } else if (parent.left === this) {
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        parent.right = this.left !== null ? this.left : this.right;
      }
      return true;
    }
    return false;
  }

  minValue() {
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.minValue();
    }
  }

  search(value) {
    if (this.value === value) {
      return this;
    } else if (value < this.value && this.left !== null) {
      return this.left.search(value);
    } else if (value > this.value && this.right !== null) {
      return this.right.search(value);
    }
    return null;
  }

  display(x, y, level, direction) {
    fill(255);
    stroke(0);
    ellipse(x, y, NODE_RADIUS * 2, NODE_RADIUS * 2);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.value, x, y);

    stroke(0);
    if (this.left !== null) {
      line(x, y + NODE_RADIUS, x - 150 / level, y + 150 - NODE_RADIUS);
      this.left.display(x - 150 / level, y + 150, level + 1, "left");
    }
    if (this.right !== null) {
      line(x, y + NODE_RADIUS, x + 150 / level, y + 150 - NODE_RADIUS);
      this.right.display(x + 150 / level, y + 150, level + 1, "right");
    }
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  addNode(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.root.addNode(newNode);
    }
  }

  removeNode(value) {
    if (this.root !== null) {
      if (this.root.value === value) {
        const auxRoot = new Node(null);
        auxRoot.left = this.root;
        const result = this.root.removeNode(value, auxRoot);
        this.root = auxRoot.left;
        return result;
      } else {
        return this.root.removeNode(value, null);
      }
    }
    return false;
  }

  search(value) {
    if (this.root !== null) {
      return this.root.search(value);
    }
    return null;
  }

  display() {
    if (this.root !== null) {
      this.root.display(width / 2, 50, 2, "");
    }
  }
}
