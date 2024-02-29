let values = [];
let w = 10;
let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1; // -1 indicates no special state
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1; // Reset state after partitioning

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1; // State 1 for elements being compared
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0; // State 0 for current pivot

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1; // Reset state of previous pivotIndex
      pivotIndex++;
      states[pivotIndex] = 0; // New pivotIndex
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1; // Reset state of elements that were being compared
    }
  }

  return pivotIndex;
}

async function swap(arr, a, b) {
  await sleep(50); // Delay for visualization
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill("#E0777D"); // Color for pivot
    } else if (states[i] == 1) {
      fill("#D6FFB7"); // Color for elements being compared
    } else {
      fill(255); // Default color
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
