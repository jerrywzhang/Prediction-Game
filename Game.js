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
var lastKeyPressed = 0;

document.addEventListener("keydown", function(event) {
  var key = event.keyCode;
  if (lastKeyPressed == key) {
    keyPressed = 0;
    console.log("HELD DOWN " + keyPressed);
  } else if (key == 49 || key == 97) {
    timePressed = performance.now();
    console.log("1 Pressed");
    keyPressed = 1;
  } else if (key == 50 || key == 98) {
    timePressed = performance.now();
    console.log("2 Pressed");
    keyPressed = 2;
  } else if (key == 51 || key == 99) {
    timePressed = performance.now();
    console.log("3 Pressed");
    keyPressed = 3;
  } else if (key == 13) {
    // console.log("enter");
  } else {
    // console.log("Key Number " + key + " Pressed");
    keyPressed = 0;
  }
  lastKeyPressed = key;
  // console.log(timePressed);
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
// var ball2 = new Ball(WINDOW_WIDTH/2 - 20, 25, "#FF0000");

var render = function() {
  context.fillStyle = "#FFFFFF"; // hex color: white
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
  // ball2.render();
};

var arrayCounter = 0;
var hitCounter = 0;
var missCounter = 0;
var doneOnce = false;

Ball.prototype.update = function(basket) {
  // console.log(arrayCounter + " " + outcomesArray[arrayCounter]);
  if (this.y <= WINDOW_HEIGHT*3/4) {
    this.x_speed = 0;
    this.y_speed = BASE_SPEED_Y;
    this.x += this.x_speed;
    this.y += this.y_speed;
    console.log(outcomesArray[arrayCounter] + " " + doneOnce + " " + keyPressed);
    if (keyPressed == outcomesArray[arrayCounter] && !doneOnce) {
      hitCounter++;
      keyPressed = 0;
      console.log("HIT");
      // console.log(performance.now() - timePressed);
      doneOnce = true;
      document.getElementById("hit").innerHTML = "HIT";
    } else if (keyPressed != 0) {
      console.log("MISS");
      keyPressed = 0;
      missCounter++;
      doneOnce = true;
      document.getElementById("hit").innerHTML = "MISS";
    }
  } else {
    console.log("TOO LATE!!!!!!!!!!!!!");
    doneOnce = false;
    if (outcomesArray[arrayCounter] == 1) {
      this.x_speed = -30;
      this.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 2) {
      this.x_speed = 0;
      this.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 3) {
      this.x_speed = 30;
      this.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 999) {
      this.x_speed = 0;
      this.y_speed = 0;
    } else {
      alert("There's an issue!");
    }
    this.x += this.x_speed;
    this.y += this.y_speed;
    if (this.y > WINDOW_HEIGHT - 20) {
      this.x = WINDOW_WIDTH/2;
      this.y = 25;
      keyPressed = 0;
      if (arrayCounter < 199) {
        arrayCounter++;
        // sleep(100);
      } else {
        alert("You've finished the game!");
        outcomesArray.push(999);
        arrayCounter = 200;
        this.x = WINDOW_WIDTH/2;
        this.y = 25;
        console.log("HIT: " + hitCounter + " MISS: " + missCounter + " %: " + hitCounter/200);
        console.log(hitCounter + missCounter);
      }
    }
    // console.log(performance.now());
  }
};

Player.prototype.update = function() {
  // console.log("KP: " + keyPressed + " " + timePressed);
  var timeDifference = performance.now() - timePressed;
  // console.log(performance.now());
  if (timeDifference > 200) {
    this.basket.move(888, 888); // off the screen
    keyPressed = 0;
  } else if (keyPressed == 1) {
    this.basket.move(WINDOW_WIDTH/2 - 200, WINDOW_HEIGHT-20);
  } else if (keyPressed == 2) {
    this.basket.move(WINDOW_WIDTH/2 - 25, WINDOW_HEIGHT-20);
  } else if (keyPressed == 3) {
    this.basket.move(WINDOW_WIDTH/2 + 175, WINDOW_HEIGHT-20);
  }
};

Basket.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
}

var update = function() {
  player.update();
  ball.update(player.basket);
  // ball2.update(player.basket);
};

function sleep(milliseconds) {
  var start = performance.now();
  for (var i = 0; i < 1e7; i++) {
    if ((performance.now() - start) > milliseconds){
      break;
    }
  }
}
