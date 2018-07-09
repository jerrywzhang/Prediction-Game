// Author: Jerry Zhang

// Variables to change



// Code starts here
var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BG_IMAGE = "http://wallpapercave.com/wp/MuIV2JN.jpg" // unused
var BASE_SPEED_Y = 20;
var BALL_RADIUS = 25;

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
var background = new Image();
background.src = BG_IMAGE;
var context = canvas.getContext('2d');
background.onload = function() {
    context.drawImage(background, 0, 0);
}

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
  context.fillStyle = "#0000FF"; // blue
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
   this.basket = new Basket(WINDOW_WIDTH/2 - 25, WINDOW_HEIGHT-20, 50, 10);
}
Player.prototype.render = function() {
  this.basket.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = BASE_SPEED_Y;
  this.radius = 25;
}
Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#000000"; // black
  context.fill();
};

var player = new Player();
var ball = new Ball(WINDOW_WIDTH/2, 25);

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
};

Ball.prototype.update = function(basket) {
  if (this.y <= WINDOW_HEIGHT/2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
  } else {
    // console.log("DOWN!")
  }


  var top_x = this.x - BALL_RADIUS;
  var top_y = this.y - BALL_RADIUS;
  var bottom_x = this.x + BALL_RADIUS;
  var bottom_y = this.y + BALL_RADIUS;

  // if(this.x - BALL_RADIUS < 0) { // hitting the left wall
  //   this.x = BALL_RADIUS;
  //   this.x_speed = -this.x_speed;
  // } else if(this.x + BALL_RADIUS > WINDOW_WIDTH) { // hitting the right wall
  //   this.x = WINDOW_WIDTH - BALL_RADIUS;
  //   this.x_speed = -this.x_speed;
  // }

  // if(this.y < 0 || this.y > WINDOW_HEIGHT) { // a point was scored
  //   this.x_speed = 0;
  //   this.y_speed = BASE_SPEED_Y;
  //   this.x = WINDOW_WIDTH/2;
  //   this.y = 25;
  // }

  if(top_y > 300) {
    if(top_y < (basket.y + basket.height) && bottom_y > basket.y && top_x < (basket.x + basket.width) && bottom_x > basket.x) {
      this.y_speed = -BASE_SPEED_Y;
      this.x_speed += (basket.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};

var keysDown = {};
window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});
window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

Player.prototype.update = function() {
  // KEY CODES: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  // 1: 49, numpad 97
  // 2: 50, numpad 98
  // 3: 51, numpad 99
  // Left arrow: 37
  // right arrow: 39

  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) { // left arrow
      this.basket.move(-4, 0);
    } else if (value == 39) { // right arrow
      this.basket.move(4, 0);
    } else {
      this.basket.move(0, 0);
    }
  }
};

Basket.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) { // all the way to the left
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > WINDOW_WIDTH) { // all the way to the right
    this.x = WINDOW_WIDTH - this.width;
    this.x_speed = 0;
  }
}

var update = function() {
  player.update();
  ball.update(player.basket);
};
