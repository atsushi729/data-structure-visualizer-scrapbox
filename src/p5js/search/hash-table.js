let hashTable = [];
let hashTableSize = 10;
let inputBox; // キー入力ボックス用の変数
let submitButton; // キー送信ボタン用の変数

function setup() {
  createCanvas(900, 300);
  background(0);

  // ハッシュテーブルの初期描画
  drawHashTable();

  // 入力ボックスとボタンのセットアップ
  setupInput();
}

// 入力ボックスとボタンのセットアップ関数
function setupInput() {
  // キー入力ボックスの作成
  inputBox = createInput("");
  inputBox.position(325, 50);

  // キー送信ボタンの作成
  submitButton = createButton("Insert Key");
  submitButton.position(inputBox.x + inputBox.width, 50);
  submitButton.mousePressed(insertFromInput); // ボタンがクリックされたときの関数を設定
}

// 入力ボックスからキーを挿入する関数
function insertFromInput() {
  // 入力値を数値に変換
  const key = parseInt(inputBox.value());
  // 数値が有効かチェック
  if (!isNaN(key)) {
    insertKey(key);
    inputBox.value(""); // 入力ボックスをクリア
  }
}

// ハッシュテーブルにキーを追加する関数
function insertKey(key) {
  let index = hashFunction(key);
  if (!hashTable[index]) {
    hashTable[index] = [];
  }
  hashTable[index].push(key);
  // 新たなキーを追加した後にハッシュテーブルを再描画
  drawHashTable();
  highlightIndex(index);
}

// ハッシュ関数の定義
function hashFunction(key) {
  let position = key % hashTableSize;

  console.log(position);
  while (position > hashTableSize) {
    position -= 1;
  }
  console.log(position);
  return position;
}

// ハッシュテーブルを描画する関数
function drawHashTable() {
  background(0); // 背景をクリア
  let startX = 150;
  let startY = 100;
  let boxSize = 50;

  // ハッシュテーブルの配列を描画
  for (let i = 0; i < hashTableSize; i++) {
    let x = startX + (boxSize + 10) * i;
    stroke(255);
    fill(255);
    rect(x, startY, boxSize, boxSize);
    if (hashTable[i]) {
      fill(0);
      text(hashTable[i].join(", "), x + 5, startY + boxSize / 2);
    }
  }
}

// 指定されたインデックスをハイライトする関数
function highlightIndex(index) {
  let startX = 150;
  let startY = 100;
  let boxSize = 50;
  let x = startX + (boxSize + 10) * index;

  noFill();
  stroke(255, 204, 0);
  strokeWeight(3);
  rect(x, startY, boxSize, boxSize);
}

// ハッシュ関数の視覚化を表示する関数
function drawHashFunction() {
  fill(255);
  textSize(16);
  text("Hash function", 50, 40);
  stroke(255);
  line(140, 55, 150, 55); // ハッシュ関数から出てくる線
}
