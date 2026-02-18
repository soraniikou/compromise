let colorTop1, colorBottom1, colorTop2, colorBottom2;
let mixProgress = 0;
let fadeDuration = 600; // 10秒かけてゆっくり変化

let messageDisplayed = false;
let selectedMessage = "";
const messages = ["ゆっくり 春来る", "たおやかに", "香る"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // グラデーションの色設定
  colorTop1 = color(180, 210, 255);
  colorBottom1 = color(100, 150, 255);
  colorTop2 = color(255, 200, 220);
  colorBottom2 = color(200, 150, 255);
}

function draw() {
  // 進行度を更新
  if (mixProgress < 1) {
    mixProgress += 1 / fadeDuration;
  }

  let currentTop = lerpColor(colorTop1, colorTop2, mixProgress);
  let currentBottom = lerpColor(colorBottom1, colorBottom2, mixProgress);

  // 背景グラデーションを描画
  drawGradient(currentTop, currentBottom);

  // 指輪を描画（光の演出を含む）
  drawGoldenRings(mixProgress);

  // 10秒経ったらメッセージを表示
  if (mixProgress >= 1) {
    if (!messageDisplayed) {
      selectedMessage = random(messages);
      messageDisplayed = true;
    }
    displayMessage();
  }
}

// 金色の指輪を描く関数
function drawGoldenRings(progress) {
  push();
  let ringSize = width * 0.18;
  let centerX = width / 2;
  let centerY = height / 2;
  let offset = map(progress, 0, 1, width * 0.3, ringSize * 0.3);
  
  noFill();
  strokeWeight(8);
  
  // 左右の指輪を描画
  drawOneRing(centerX - offset, centerY, ringSize);
  drawOneRing(centerX + offset, centerY, ringSize);
  
  // キラキラした光の演出（sありの名前に統一）
  // 10回に1回、ゆったりと光を生成
  if (progress > 0.8 && frameCount % 10 === 0) { 
    drawSparkles(centerX, centerY, progress);
  }
  pop();
}

// ひとつの指輪を描く関数
function drawOneRing(x, y, size) {
  stroke(180, 140, 20, 150); // 影の色
  ellipse(x, y, size, size);
  stroke(255, 215, 0); // 金色
  strokeWeight(5);
  ellipse(x, y, size, size);
  stroke(255, 255, 150, 200); // ハイライト
  strokeWeight(2);
  arc(x, y, size, size, -PI/4, PI/4);
}

// 光の粒を描く関数
function drawSparkles(x, y, p) {
  let alpha = map(p, 0.8, 1, 0, 150);
  fill(255, 255, 200, alpha);
  noStroke();
  // 指の位置から少し散らす
  ellipse(x + random(-50, 50), y + random(-50, 50), random(2, 5));
}

// 背景のグラデーションを描く関数（これが無いとエラーになります）
function drawGradient(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// メッセージを表示する関数
function displayMessage() {
  noStroke();
  fill(255, 255, 255, 200);
  textAlign(CENTER, CENTER);
  textSize(width * 0.04); // 半分以下の小さめのサイズ
  textFont('serif');
  text(selectedMessage, width / 2, height / 2 + height * 0.2);
}

// 画面サイズが変わった時の調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// クリックで最初から再生
function mousePressed() {
  mixProgress = 0;
  messageDisplayed = false;
}