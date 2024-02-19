let values = [];
let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / 8));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  mergeSort(values, 0, values.length - 1);
}

async function mergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  const middle = floor((start + end) / 2);
  await mergeSort(arr, start, middle);
  await mergeSort(arr, middle + 1, end);
  await merge(arr, start, middle, end);
}

async function merge(arr, start, middle, end) {
  let start2 = middle + 1;

  if (arr[middle] <= arr[start2]) {
    return;
  }

  while (start <= middle && start2 <= end) {
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;

      while (index !== start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      start++;
      middle++;
      start2++;
    }
  }
  await sleep(180);
}

function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    if (states[i] == 0) {
      stroke("#E0777D");
    } else {
      stroke(255);
    }
    line(i * 8, height, i * 8, height - values[i]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
