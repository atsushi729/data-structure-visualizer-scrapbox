let queue = [];
let spacing = 60; // Space between each box in the queue
let boxWidth = 50;
let boxHeight = 30;
let startX = 10;
let startY = 100;
let animationQueue = [];
let isAnimating = false;

function setup() {
  createCanvas(400, 200);
  textAlign(CENTER, CENTER);
  frameRate(100); // Slow down frame rate for smoother animation

  // Create enqueue and dequeue buttons below the canvas
  let enqueueButton = createButton("Enqueue");
  enqueueButton.position(20, height + 40);
  enqueueButton.mousePressed(() => enqueue(int(random(1, 100)))); // Random number to enqueue

  let dequeueButton = createButton("Dequeue");
  dequeueButton.position(100, height + 40);
  dequeueButton.mousePressed(dequeue);
}

function draw() {
  background(240);

  if (isAnimating && animationQueue.length > 0) {
    updateAnimation();
  }

  // Draw the queue
  for (let i = 0; i < queue.length; i++) {
    let x = startX + i * spacing;
    drawBox(x, startY, queue[i], i === 0, i === queue.length - 1);
  }
}

// Function to draw a box
function drawBox(x, y, value, isHead, isTail) {
  fill(100, 100, 250);
  stroke(0);
  rect(x, y, boxWidth, boxHeight);
  fill(255);
  text(value, x + boxWidth / 2, y + boxHeight / 2);

  if (isHead) {
    fill(0, 255, 0, 100);
    rect(x, y, boxWidth, boxHeight);
    fill(0);
    text("Head", x + boxWidth / 2, y - 20);
  }

  if (isTail) {
    fill(255, 0, 0, 100);
    rect(x, y, boxWidth, boxHeight);
    fill(0);
    text("Tail", x + boxWidth / 2, y + boxHeight + 20);
  }
}

// Function to add a new element to the queue
function enqueue(newItem) {
  if (!isAnimating) {
    queue.push(newItem); // Add to the end of the queue
    animate("enqueue");
  }
}

// Function to remove an element from the queue
function dequeue() {
  if (!isAnimating && queue.length > 0) {
    queue.shift(); // Remove from the beginning of the queue
    animate("dequeue");
  }
}

// Animation control
function animate(type) {
  isAnimating = true;
  let targetX;
  
  if (type === "enqueue") {
    let newItemX = startX + (queue.length - 1) * spacing;
    animationQueue.push({
      x: width,
      y: startY,
      value: queue[queue.length - 1],
      targetX: newItemX,
    });
  } else if (type === "dequeue") {
    for (let i = 0; i < queue.length; i++) {
      targetX = startX + i * spacing;
      animationQueue.push({
        x: startX + (i + 1) * spacing,
        y: startY,
        value: queue[i],
        targetX: targetX,
      });
    }
    animationQueue.push({
      x: startX,
      y: startY,
      value: "",
      targetX: -boxWidth,
    }); // Animate out the dequeued item
  }
}

// Update animation frames
function updateAnimation() {
  for (let i = animationQueue.length - 1; i >= 0; i--) {
    let item = animationQueue[i];
    item.x += (item.targetX - item.x) * 0.1; // Ease the movement towards the targetX
    drawBox(item.x, item.y, item.value, false, false);
    if (abs(item.x - item.targetX) < 1) {
      animationQueue.splice(i, 1); // Remove from animation queue when close to target
    }
  }
  if (animationQueue.length === 0) {
    isAnimating = false;
  }
}
