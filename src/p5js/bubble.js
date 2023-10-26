// Define initial values and control variables
let values = [];
let i = 0;
let j = 0;
let lerping = false; // Indicates if lerp animation is active
let lerpStart = 0;
let lerpEnd = 0;
let lerpAmount = 0;
let playButton;

// Setup canvas, initialize values, and create Play button
function setup() {
  createCanvas(400, 300);
  initializeValues();

  playButton = createButton("Play");
  playButton.position(10, height + 10);
  playButton.mousePressed(restartAnimation);
  frameRate(10);
}

// Initialize the 'values' array with random heights
function initializeValues() {
  values = [];
  for (let k = 0; k < 10; k++) {
    values.push({
      value: random(height),
      position: k,
    });
  }
}

// Restart the sorting animation
function restartAnimation() {
  loop();
  i = 0;
  j = 0;
  lerping = false;
  lerpAmount = 0;
  initializeValues();
}

// Main draw loop
function draw() {
  background(220);

  // If not in the middle of an animation/lerp
  if (!lerping) {
    // Compare values and prepare for lerp if necessary
    if (values[j].value > values[j + 1].value) {
      lerpStart = values[j].position;
      lerpEnd = values[j + 1].position;
      [values[j].position, values[j + 1].position] = [
        values[j + 1].position,
        values[j].position,
      ]; // Swap positions
      [values[j], values[j + 1]] = [values[j + 1], values[j]]; // Swap values
      lerping = true;
    } else {
      j++;
    }

    // Move to next set of values or complete sorting
    if (j >= values.length - i - 1) {
      j = 0;
      i++;
    }

    if (i >= values.length) {
      noLoop(); // Stop drawing once sorting is complete
    }
  }

  // Control the lerp animation
  if (lerping) {
    lerpAmount += 0.1;
    if (lerpAmount >= 1) {
      lerpAmount = 0;
      lerping = false; // Stop lerp once complete
    }
  }

  // Draw the bars
  for (let k = 0; k < values.length; k++) {
    let w = width / values.length;
    let posX;

    // Determine position for bars during lerp
    if (
      lerping &&
      (values[k].position === lerpStart || values[k].position === lerpEnd)
    ) {
      posX = lerp(k * w, values[k].position * w, lerpAmount);
    } else {
      posX = values[k].position * w;
    }

    // Color current bars being compared
    if (k === j || k === j + 1) {
      fill(255, 0, 0); // Red color for active bars
    } else {
      fill(50); // Default color for inactive bars
    }
    rect(posX, height, w, -values[k].value); // Draw bar
  }
}
