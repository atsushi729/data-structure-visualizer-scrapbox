let canvasWidth = 800;
let canvasHeight = 400;
let nodes = [];
let nodeDistance = 150;
let dataInput;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  let btn = createButton("Add Random Node");
  btn.position(10, canvasHeight + 10);
  btn.mousePressed(addNode);
}

function draw() {
  background(220);

  // Draw links first to ensure nodes are drawn on top
  for (let i = 0; i < nodes.length - 1; i++) {
    drawLink(nodes[i], nodes[i + 1]);
  }

  for (let node of nodes) {
    node.display();
  }
}

function addNode() {
  let nodeValue = floor(random(1, 1000)); // Generates a random integer between 1 and 999
  nodes.push(new Node(nodeValue.toString())); // Convert the number to a string and push it to the nodes array
}

function drawArrow(x1, y1, x2, y2) {
  stroke(0);
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  let arrowSize = 10;
  line(0, 0, -arrowSize, arrowSize / 2);
  line(0, 0, -arrowSize, -arrowSize / 2);
  pop();
}

function mousePressed() {
  console.log(nodes);
  for (let node of nodes) {
    if (node.contains(mouseX, mouseY)) {
      node.startDragging(mouseX, mouseY);
      break; // Assume only one node can be dragged at a time
    }
  }
}

function mouseReleased() {
  for (let node of nodes) {
    node.stopDragging();
  }
}

function mouseDragged() {
  for (let node of nodes) {
    if (node.isDragging) {
      node.drag(mouseX, mouseY);
    }
  }
}

function drawLink(node1, node2) {
  stroke(0);
  let linkLength = dist(node1.x, node1.y, node2.x, node2.y);
  let arrowSize = 10;
  let ratio = (linkLength - arrowSize - 55) / linkLength; // Subtract the node radius (25 if diameter is 50) and arrow size

  // Calculate the endpoint taking into account the arrow size and node size
  let endX = lerp(node1.x, node2.x, ratio);
  let endY = lerp(node1.y, node2.y, ratio);

  line(node1.x, node1.y, endX, endY);

  // Draw the arrowhead
  push();
  translate(endX, endY);
  rotate(atan2(node2.y - node1.y, node2.x - node1.x));
  line(0, 0, -arrowSize, arrowSize / 2);
  line(0, 0, -arrowSize, -arrowSize / 2);
  pop();
}

class Node {
  constructor(value) {
    this.value = value;

    if (nodes.length > 0) {
      let lastNode = nodes[nodes.length - 1];
      this.x = lastNode.x + nodeDistance;

      // If the new node's x position goes beyond canvas width,
      // reset x to the start and move y down by a certain amount (e.g., 60 pixels).
      if (this.x + 25 > canvasWidth) {
        // 25 is half the diameter of the node
        this.x = 25;
        this.y = lastNode.y + 60;
      } else {
        this.y = lastNode.y;
      }

      // If y goes beyond canvas height, reset to the top.
      if (this.y + 25 > canvasHeight) {
        this.y = 25;
      }
    } else {
      // Initial position for the first node
      this.x = width / 2;
      this.y = height / 2;
    }

    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  contains(x, y) {
    let d = dist(this.x, this.y, x, y);
    return d < 25; // Assuming a node's radius is 25
  }

  startDragging(x, y) {
    this.isDragging = true;
    this.offsetX = this.x - x;
    this.offsetY = this.y - y;
  }

  stopDragging() {
    this.isDragging = false;
  }

  drag(x, y) {
    if (this.isDragging) {
      this.x = x + this.offsetX;
      this.y = y + this.offsetY;
    }
  }

  display() {
    fill(255);
    stroke(0);

    // Draw the "data" rectangle
    rect(this.x - 50, this.y - 25, 50, 50);

    // Draw the "next" rectangle
    rect(this.x, this.y - 25, 50, 50);

    fill(0);
    textAlign(CENTER, CENTER);

    // Display the value in the "data" rectangle
    text(this.value, this.x - 25, this.y);

    // Display 'next' in the "next" rectangle (optional)
    text("next", this.x + 25, this.y);
  }
}
