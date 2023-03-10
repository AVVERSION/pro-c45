var titleImg;
var playbutton;
var gameState;
var fruit;
var score;
var timer;
var trail = [];

function preload() {
  titleImg = loadImage("img/title.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 20);
  gtitle = createSprite(width / 2, height / 2 - 200);
  gtitle.addImage(titleImg);
  playbutton = createButton("Play");
  playbutton.position(width / 2 - 50, height / 2 + 100);
  playbutton.class("playbutton");

  score = 0;

  // define mousePressed() function outside of playgame()
  mousePressed = function () {
    if (mouseIsPressed && fruit && fruit.overlapPoint(mouseX, mouseY)) {
      fruit.remove();
      score += 1;
      fruit = null;
      timer = 60; // reset timer
      trail = []; // clear the trail
    }
  };
}

function draw() {
  background(123, 75, 75);

  playbutton.mousePressed(() => {
    gtitle.remove();
    playbutton.class("hide");
    gameState = "play";
    timer = 60; // 1 second
  });

  // check for user input inside the draw() function
  if (gameState == "play") {
    if (timer > 0) {
      timer--;
      if (!fruit) {
        fruit = createSprite(random(0, width), random(0, height));
        const fruitnames = ["watermelon", "apple", "banana", "orange", "mango"];
        var fruitImg = `img/${fruitnames[Math.floor(Math.random() * 4)]}.png`;
        fruit.addImage(loadImage(fruitImg));
      }
    } else {
      // game over
      fill(255);
      textSize(48);
      text("Game Over", width / 2 - 120, height / 2 - 100);
      textSize(32);
      text(`Final Score: ${score}`, width / 2 - 100, height / 2);
      noLoop();
    }
  }

  windowResized();
  drawSprites();

  // display score
  textSize(32);
  text(`Score: ${score}`, 50, 50);

  // draw the mouse trail
  trail.push(createVector(mouseX, mouseY));
  if (trail.length > 20) {
    trail.splice(0, 1);
  }
  stroke(255, 255, 255, 50);
  strokeWeight(20);
  noFill();
  beginShape();
  for (var i = 0; i < trail.length; i++) {
    curveVertex(trail[i].x, trail[i].y);
  }
  endShape();
}

function windowResized() {
  if (width != windowWidth || height != windowHeight - 20) {
    resizeCanvas(windowWidth, windowHeight - 20);
  }
}
