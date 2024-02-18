let values;
let w = 10; // Width of the bars to visualize the sorting

// This will initialize the array with random values
function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
  mergeSort(values, 0, values.length - 1);
}

// This function will draw the array as vertical lines
function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    stroke(255);
    fill(255);
    rect(i * w, height - values[i], w, values[i]);
  }
}

// MergeSort Implementation
async function mergeSort(arr, start, end) {
  if (start < end) {
    let middle = floor((start + end) / 2);
    await Promise.all([
      mergeSort(arr, start, middle),
      mergeSort(arr, middle + 1, end),
    ]);
    await merge(arr, start, middle, end);
  }
}

// Merge function for mergeSort
async function merge(arr, start, middle, end) {
  let n1 = middle - start + 1;
  let n2 = end - middle;
  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[start + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[middle + 1 + j];
  }

  let i = 0,
    j = 0,
    k = start;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
    await sleep(50); // A sleep function that pauses for 50 milliseconds
    redraw(); // Redraw the canvas to update the visualization
  }

  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
    await sleep(50);
    redraw();
  }

  // Copy the remaining elements of R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
    await sleep(50);
    redraw();
  }
}

// Sleep function to visualize the sorting steps
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
