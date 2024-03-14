let values = [];
let target;
let left, right, mid;
let state = 'searching'; // 'searching', 'found', 'not found'

function setup() {
  createCanvas(800, 200);
  let total = 30; // Total number of elements
  for (let i = 0; i < total; i++) {
    values.push(floor(random(100)));
  }
  values.sort((a, b) => a - b); // Sort the array for binary search
  target = values[floor(random(values.length))]; // Pick a random target from the array
  left = 0;
  right = values.length - 1;
  mid = floor((left + right) / 2);
}

function draw() {
  background(255);
  drawValues();

  if (state === 'searching') {
    binarySearchStep();
  }

  if (frameCount % 100 === 0) { // Slow down the search steps for visualization
    if (values[mid] === target) {
      state = 'found';
    } else if (left > right) {
      state = 'not found';
    } else if (values[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = floor((left + right) / 2);
  }

  displayTarget();
}

function drawValues() {
  let boxWidth = width / values.length;
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(180);
    if (i >= left && i <= right) {
      fill(140); // Highlight search range
    }
    if (i === mid) {
      fill(state === 'found' ? 'green' : 'red'); // Highlight middle element
    }
    rect(i * boxWidth, height / 2 - 20, boxWidth - 2, 40);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(values[i], i * boxWidth + boxWidth / 2, height / 2);
  }
}

function displayTarget() {
  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text(`Target: ${target}`, width / 2, 20);
}

function binarySearchStep() {
  // This function intentionally left blank, as the binary search step logic is integrated into the draw function.
}
