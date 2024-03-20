let values = [];
let target;
let index = 0;
let state = "searching"; // 'searching', 'found', 'not found'

function setup() {
  createCanvas(800, 200);
  let total = 30; // Total number of elements
  for (let i = 0; i < total; i++) {
    values.push(floor(random(100)));
  }
  target = values[floor(random(values.length))]; // Pick a random target from the array
}

function draw() {
  background(255);
  drawValues();

  if (frameCount % 10 === 0) {
    if (state === "searching") {
      linearSearchStep();
    }
  }

  displayTarget();
}

function drawValues() {
  let boxWidth = width / values.length;
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(180);
    if (i === index) {
      fill(state === "found" ? "#F4EF4C" : "red"); // Highlight the current element
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

function linearSearchStep() {
  if (values[index] === target) {
    state = "found"; // 目的の値が見つかった場合
  } else {
    index++;
    if (index >= values.length) {
      state = "not found"; // 配列の最後まで探索し、目的の値が見つからなかった場合
    }
  }
}
