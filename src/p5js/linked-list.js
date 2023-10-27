let canvasWidth = 800;
let canvasHeight = 400;
let nodes = [];
let nodeDistance = 100;
let dataInput;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Input field for node data
  dataInput = createInput("");
  dataInput.position(10, canvasHeight + 10);

  let btn = createButton("Add Node");
  btn.position(dataInput.x + dataInput.width + 10, canvasHeight + 10);
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
  let nodeValue = dataInput.value(); // Grab value from the input field

  // Check if the value is an integer with 1 to 3 digits
  if (nodeValue !== "" && isLessThanThreeDigitInteger(nodeValue)) {
    nodes.push(new Node(nodeValue));
    dataInput.value(""); // Clear the input field
  } else {
    alert("Please enter an integer with up to 3 digits.");
  }
}

function isLessThanThreeDigitInteger(str) {
  return /^\d{1,3}$/.test(str);
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
  let ratio = (linkLength - arrowSize - 25) / linkLength; // Subtract the node radius (25 if diameter is 50) and arrow size

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

    // If there are nodes present, set the new node's position relative to the last node
    if (nodes.length > 0) {
      let lastNode = nodes[nodes.length - 1];
      this.x = lastNode.x + nodeDistance; // added nodeDistance to space out the nodes
      this.y = lastNode.y;
    } else {
      // If no nodes are present, set it to the center of the canvas
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
    ellipse(this.x, this.y, 50, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.value, this.x, this.y);
  }
}
