// Author: Jerry Zhang

// Variables
var NUMBER_OF_TRIALS = 200; // this is per ball. Make sure it's 200 or less.

// Code starts here
var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BALL_RADIUS = 25;

var keyPressArray = [];

var timeArray = [4000, 4000, 4000, 4000];

var timePressed = 0;
var keyPressed = 0;
var lastKeyPressed = 0;
var newKeyPressed = false;

document.addEventListener("keydown", function(event) {
  var key = event.keyCode;
  if (lastKeyPressed == key) {
    keyPressed = 0;
    console.log("HELD DOWN " + keyPressed);
  } else if (key == 49 || key == 97) {
    timePressed = performance.now();
    console.log("1 Pressed");
    keyPressed = 1;
    newKeyPressed = true;
  } else {
    // console.log("Key Number " + key + " Pressed");
    keyPressed = 0;
    newKeyPressed = false;
  }
  lastKeyPressed = key;
});

document.addEventListener("keyup", function(event) {
  lastKeyPressed = 0;
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
var image = new Image();
image.src = "grass.jpg";

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
  context.fillStyle = "#FFFFFF"; // white
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
   this.basket = new Basket(888, 888, 50, 50); // starts basket off the screen
}

Player.prototype.render = function() {
  this.basket.render();
};

function Ball(color, id, counter) {
  this.x = -25;
  this.y = 0; // start both balls off the screen
  this.x_speed = 0;
  this.y_speed = 0;
  this.radius = 25;
  this.color = color;
  this.id = id;
  this.counter = counter;
}
1
Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
};

var player = new Player();
var ball = new Ball("#0000FF", 0, 0);
var ball2 = new Ball("#FF0000", 1, 200);

var render = function() {
  context.fillStyle = context.createPattern(image, "no-repeat");
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
  ball2.render();
};

var arrayCounter = 0;
var hitCounter = 0;
var missCounter = 0;
var doneOnce = false;
var hitThisTime = false;
var doneWithGame_Ball0 = false;
var doneWithGame_Ball1 = false;
var startTime = 0;  // TODO: reset it somewhere
var wasKeyPressedLastTime = false;
var run = true;

function updateBall(ball) {
  if (ball.id == 0 & doneWithGame_Ball0) {
    run = false;
  } else if (ball.id == 1 && doneWithGame_Ball1) {
    run = false;
  } else {
    run = true;
  }
  if (run) {
    document.getElementById("go").innerHTML = "Status: Press 1, 2, or 3!";
    if (performance.now() - startTime < timeArray[ball.counter]) { // TODO: Create timeArray
      ball.x_speed = 0;
      ball.y_speed = 0;
      ball.x = WINDOW_WIDTH/2;
      ball.y = WINDOW_HEIGHT/2;
      if (keyPressed != 0) 
    }
  } else {

  }

};

Ball.prototype.update = function(basket) {
  if (this.id == ballAppearArray[arrayCounter] && !ranAlertAlready) {
    updateBall(this);
  }
};

var timeDifference = 0;

Player.prototype.update = function() {
  timeDifference = performance.now() - timePressed;
  if (timeDifference > 200) {
    this.basket.move(888, 888, 0); // off the screen
    keyPressed = 0;
  } else if (keyPressed == 1) {
    this.basket.move(WINDOW_WIDTH/2 - 25, WINDOW_HEIGHT-100, 0);
  }
};

Basket.prototype.move = function(x, y, rotation) {
  this.x = x;
  this.y = y;
  this.angle = rotation * Math.PI/180;
}

var update = function() {
  player.update();
  ball.update(player.basket);
  ball2.update(player.basket);
};

function saveVariableToFile(name, variable) {
  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(variable);
  hiddenElement.target = '_blank';
  hiddenElement.download = name + '.txt';
  hiddenElement.click();
}
