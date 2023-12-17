/*created by prashant shukla */

var paddle2 = 10,
  paddle1 = 10;

var paddle1X = 10,
  paddle1Height = 110;
var paddle2Y = 685,
  paddle2Height = 70;

var score1 = 0,
  score2 = 0;
var paddle1Y;

var playerscore = 0;
var audio1;
var pcscore = 0;
//ball x and y and speedx speed y and radius
var ball = {
  x: 350 / 2,
  y: 480 / 2,
  r: 20,
  dx: 3,
  dy: 3
}

function setup() {
  var canvas = createCanvas(700, 600);
  canvas.center();
}


function draw() {

  background(254, 249, 245);

  fill("#f7e5d7");
  stroke("#f7e5d7");
  rect(680, 0, 20, 700);

  fill("#f7e5d7");
  stroke("#f7e5d7");
  rect(0, 0, 20, 700);

  //funtion paddleInCanvas call 
  paddleInCanvas();

  //left paddle
  fill(230, 195, 168);
  stroke(230, 195, 168);
  strokeWeight(0.5);
  paddle1Y = mouseY;
  rect(paddle1X, paddle1Y, paddle1, paddle1Height, 100);


  //pc computer paddle
  fill("#e6c3a8");
  stroke("#e6c3a8");
  var paddle2y = ball.y - paddle2Height / 2;
  rect(paddle2Y, paddle2y, paddle2, paddle2Height, 100);

  //function midline call
  midline();

  //funtion drawScore call 
  drawScore();

  //function models call  
  models();

  //function move call which in very important
  move();
}



//function reset when ball does notcame in the contact of padde
function reset() {
  ball.x = width / 2 + 100,
    ball.y = height / 2 + 100;
  ball.dx = 3;
  ball.dy = 3;

}


//function midline draw a line in center
function midline() {
  for (i = 0; i < 480; i += 10) {
    var y = 0;
    fill(252,229,215);
    stroke(252,229,215);
    rect(width / 2, y + i, 10, 480);
  }
}


//function drawScore show scores
function drawScore() {
  textAlign(CENTER);
  textSize(20);
  fill(230, 195, 168);
  stroke(230, 195, 168);
  text("Player:", 100, 50)
  text(playerscore, 140, 50);
  text("Computer:", 500, 50)
  text(pcscore, 555, 50)
}


//very important function of this game
function move() {
  fill(247, 229, 215);
  stroke(247, 229, 215);
  strokeWeight(0.5);
  ellipse(ball.x, ball.y, ball.r, 20)
  ball.x = ball.x + ball.dx;
  ball.y = ball.y + ball.dy;
  if (ball.x + ball.r > width - ball.r / 2) {
    ball.dx = -ball.dx - 0.5;
  }
  if (ball.x - 2.5 * ball.r / 2 < 0) {
    if (ball.y >= paddle1Y && ball.y <= paddle1Y + paddle1Height) {
      ball.dx = -ball.dx + 0.5;
      playerscore++;
    } else {
      pcscore++;
      reset();
      navigator.vibrate(100);
    }
  }
  if (pcscore == 4) {
    fill("#2b2826");
    stroke(0)
    rect(0, 0, width, height - 1);
    fill("2b2826");
    stroke("2b2826");
    textSize(25)
    text("𝗚𝗮𝗺𝗲 𝗢𝘃𝗲𝗿! :(", width / 2, height / 2);
    text("𝘙𝘦𝘭𝘰𝘢𝘥 𝘛𝘩𝘦 𝘗𝘢𝘨𝘦!", width / 2, height / 2 + 30)
    noLoop();
    pcscore = 0;
  }
  if (ball.y + ball.r > height || ball.y - ball.r < 0) {
    ball.dy = -ball.dy;
  }
}


//width height of canvas speed of ball 
function models() {
  textSize(16);
  fill(230, 195, 168);
  stroke(230, 195, 168);
  text("Width:" + width, 135, 15);
  text("Speed:" + abs(ball.dx), 50, 15);
  text("Height:" + height, 235, 15)
}


//this function help to not go te paddle out of canvas
function paddleInCanvas() {
  if (mouseY + paddle1Height > height) {
    mouseY = height - paddle1Height;
  }
  if (mouseY < 0) {
    mouseY = 0;
  }
}