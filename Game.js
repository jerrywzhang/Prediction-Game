// Author: Jerry Zhang

// Variables to change
var file = 'https://gist.githubusercontent.com/thejwzhang/af7517ff59667192288320db2205f6f8/raw/50e29433823b3746a5120e382a8604ef4d764189/Probabilities.txt';
var NUMBER_OF_TOTAL_TRIES = 200;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 4;

// Code starts here
var finalProbabilitiesList = [];
var outcomesArray = [];
var done = false;

var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BG_IMAGE = "http://wallpapercave.com/wp/MuIV2JN.jpg"; // unused
var BASE_SPEED_Y = 20;
var BALL_RADIUS = 25;

readFile(createOutcomes);

function getResult(done) { // called as the callback of createOutcomes
  // console.log(done);
  if (done != true) { // should always be true to mean that the array has been succesfully created
    alert("The array was not created properly!");
    console.log("The array was not created properly!");
  }
  console.log(outcomesArray);
}

var timePressed = 0;
var keyPressed = 0;

document.addEventListener("keyup", function(event) {
    timePressed = performance.now();
    if (event.keyCode == 49 || event.keyCode == 97) {
      console.log("1 Pressed");
      keyPressed = 1;

    } else if (event.keyCode == 50 || event.keyCode == 98) {
      console.log("2 Pressed");
      keyPressed = 2;
    } else if (event.keyCode == 51 || event.keyCode == 99) {
      console.log("3 Pressed");
      keyPressed = 3;
    } else if (event.keyCode == 13) {
      console.log("enter");
    } else {
      console.log("Key Number " + event.keyCode + " Pressed");
      keyPressed = 0;
    }
});

var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
      window.setTimeout(callback, 1000/60)
  };

var canvas = document.createElement('canvas');
width = WINDOW_WIDTH;
height = WINDOW_HEIGHT;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function() {
  update();
  render();
  animate(step);
};

function Basket(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Basket.prototype.render = function() {
  context.fillStyle = "#000000"; // black
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
   this.basket = new Basket(888, 888, 50, 10); // starts basket off the screen
}

Player.prototype.render = function() {
  this.basket.render();
};

function Ball(x, y, color) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = BASE_SPEED_Y;
  this.radius = 25;
  this.color = color;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
};

var player = new Player();
var ball = new Ball(WINDOW_WIDTH/2, 25, "#0000FF");
var ball2 = new Ball(WINDOW_WIDTH/2 - 20, 25, "#FF0000");

var render = function() {
  context.fillStyle = "#FFFFFF"; // hex color: white
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
  ball2.render();
};

Ball.prototype.update = function(basket) {
  if (this.y <= WINDOW_HEIGHT/2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
  } else {
    // console.log("DOWN!");
  }
};

Player.prototype.update = function() {
  // console.log("KP: " + keyPressed + " " + timePressed);
  var timeDifference = performance.now() - timePressed;
  console.log(timeDifference);
  if (timeDifference > 2000) {
    this.basket.move(888, 888); // off the screen
  } else if (keyPressed == 1) {
    this.basket.move(WINDOW_WIDTH/2 - 200, WINDOW_HEIGHT-20);
  } else if (keyPressed == 2) {
    this.basket.move(WINDOW_WIDTH/2 - 25, WINDOW_HEIGHT-20);
  } else if (keyPressed == 3) {
    this.basket.move(WINDOW_WIDTH/2 + 175, WINDOW_HEIGHT-20);
  }
  keyPressed = 0;
};

Basket.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
}

var update = function() {
  player.update();
  ball.update(player.basket);
};

// KEY CODES: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
// 1: 49, numpad 97
// 2: 50, numpad 98
// 3: 51, numpad 99
// Left arrow: 37
// right arrow: 39
