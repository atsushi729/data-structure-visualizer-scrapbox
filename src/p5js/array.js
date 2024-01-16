let myArray = [];
let arraySize = 4; // Number of boxes to display initially
let boxSize;

function setup() {
  createCanvas(800, 200);
  boxSize = width / 8;

  // Initialize the array with boxes
  for (let i = 0; i < arraySize; i++) {
    myArray.push(new Box((i * boxSize) + boxSize / 2, height / 2, boxSize - 10, i + 1));
  }

  // Create buttons
  addButton = createButton('Add Box');
  addButton.mousePressed(addBox);
  
  removeButton = createButton('Remove Last Box');
  removeButton.mousePressed(removeBox);
}

function draw() {
  background(0);

  // Display the boxes and sequence numbers
  for (let i = 0; i < myArray.length; i++) {
    myArray[i].display();
    drawSequenceNumber(myArray[i].x, myArray[i].y + myArray[i].size / 2 + 20, i + 1);
  }
}

// Box class to represent each array element
class Box {
  constructor(x, y, s, num) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.number = num; // Sequence number
  }
  
  display() {
    stroke(255);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}

// Function to add a new box
function addBox() {
  if (myArray.length < width / boxSize) {
    let newBoxIndex = myArray.length;
    let newBox = new Box((newBoxIndex * boxSize) + boxSize / 2, height / 2, boxSize - 10, newBoxIndex + 1);
    myArray.push(newBox);
  }
}

// Function to remove the last box
function removeBox() {
  if (myArray.length > 0) {
    myArray.pop();
  }
}

// Draw sequence number under each box
function drawSequenceNumber(x, y, number) {
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(number, x, y);
}
