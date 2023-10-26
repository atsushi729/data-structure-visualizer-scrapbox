// Declare and initialize variables
let values = [];
let barWidth;
let i = 1;
let j = 0;
let key;
let isKeyMoving = true; // Flag to check if the key bar (colored in red) is moving towards the top

function setup() {
  createCanvas(400, 800); // Set canvas size
  barWidth = width / 10; // Width of each bar

  // Populate 'values' array with random numbers
  for (let i = 0; i < 10; i++) {
    values.push(random(width));
  }

  key = values[i]; // Initialize key with the first value
  frameRate(0.5); // Control the frame rate for visual clarity
}

// Function to perform one step of the insertion sort algorithm
function insertionSortStep() {
  // If the current value is greater than the key, shift it to the right
  if (j >= 0 && values[j] > key) {
    values[j + 1] = values[j];
    j--;
    isKeyMoving = false; // Indicates that the key bar is not moving vertically
  } else {
    values[j + 1] = key;
    i++;
    key = values[i];
    j = i - 1;
    isKeyMoving = true; // Indicates that the key bar is moving vertically
  }

  // If all elements are sorted, log a message and stop the animation loop
  if (i >= values.length) {
    console.log("Done Sorting!");
    noLoop();
  }
}

// Main drawing loop
function draw() {
  background(220); // Set canvas background color

  insertionSortStep(); // Call the sorting function to sort values step-by-step

  // Loop to draw bars and display values
  for (let x = 0; x < values.length; x++) {
    let yPosition = height; // Set default vertical position for bars

    // If the current bar is the key and it's moving, place it at the top of the canvas
    if (x === i && isKeyMoving) {
      yPosition = 50;
    }

    // Color the bars based on their roles in the sorting step
    if (x === i) {
      fill(255, 0, 0); // Red color for the key bar
    } else if (x === j) {
      fill(0, 0, 255); // Blue color for the comparing bar
    } else {
      fill(255); // White color for inactive bars
    }

    // Draw the bars
    rect(x * barWidth, yPosition, barWidth, -values[x]);

    // Display the value of each bar above it
    fill(0); // Set text color to black
    textSize(12);
    textAlign(CENTER, CENTER);
    text(
      floor(values[x]),
      x * barWidth + barWidth / 2,
      yPosition - values[x] - 10
    );
  }
}
