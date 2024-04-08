let values = [];
let target;
let hashTable = []; // Array to store values based on the hash function
let state = "searching"; // 'searching', 'found', 'not found'

function setup() {
  createCanvas(800, 200);
  let total = 30; // Total number of elements
  for (let i = 0; i < total; i++) {
    let val = floor(random(100));
    values.push(val);
    let index = hashFunction(val);
    hashTable[index] = val; // Storing the value in the hash table based on the computed index
  }
  target = values[floor(random(values.length))]; // Pick a random target from the array
}

function draw() {
  background(255);
  drawValues();

  if (frameCount % 10 === 0) {
    if (state === "searching") {
      hashSearch();
    }
  }

  displayTarget();
}

function drawValues() {
  let boxWidth = width / values.length;
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(180);
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

function hashFunction(value) {
  return value % values.length; // Simple hash function using modulo
}

function hashSearch() {
  let index = hashFunction(target);
  if (hashTable[index] === target) {
    state = "found";
  } else {
    state = "not found";
  }
}
