// Author: Jerry Zhang

// Variables to change


// Code starts here

var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BG_IMAGE = "http://wallpapercave.com/wp/MuIV2JN.jpg"; // unused
var BASE_SPEED_Y = 20;
var BALL_RADIUS = 25;

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

function Line(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Line.prototype.render = function() {
  context.fillStyle = "#000000"; // black
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
   this.basket = new Basket(888, 888, 50, 10); // starts basket off the screen
}

Player.prototype.render = function() {
  this.basket.render();
};

function Ball(x, y, color, id) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = BASE_SPEED_Y;
  this.radius = 25;
  this.color = color;
  this.id = id;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
};

var line = new Line(0, WINDOW_HEIGHT*3/4, WINDOW_WIDTH, 2);
var player = new Player();
var ball = new Ball(888, 0, "#0000FF", 1);
var ball2 = new Ball(888, 0, "#FF0000", 2); // start both balls off the screen

var render = function() {
  context.fillStyle = "#FFFFFF"; // hex color: white
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
  line.render();
  ball2.render();
  // console.log(ball.y);
};

var arrayCounter = 0;
var hitCounter = 0;
var missCounter = 0;
var doneOnce = false;
var hitThisTime = false;

function updateBall(ball) {
  document.getElementById("go").innerHTML = "Status: Press 1, 2, or 3!";
  // console.log(arrayCounter + " " + outcomesArray[arrayCounter]);
  if (ball.y <= WINDOW_HEIGHT*3/4) {
    ball.x_speed = 0;
    ball.y_speed = BASE_SPEED_Y;
    ball.x += ball.x_speed;
    ball.y += ball.y_speed;
    // console.log(keyPressed);
    // console.log(outcomesArray[arrayCounter] + " " + doneOnce + " " + keyPressed);
    if (keyPressed == outcomesArray[arrayCounter] && !doneOnce) {
      hitCounter++;
      keyPressed = 0;
      console.log("HIT");
      // console.log(performance.now() - timePressed);
      doneOnce = true;
      hitThisTime = true;
    } else if (keyPressed != 0 && !doneOnce) {
      console.log("MISS");
      keyPressed = 0;
      missCounter++;
      doneOnce = true;
      hitThisTime = false;
    }
  } else {
    // console.log(hitThisTime);
    // console.log("TOO LATE!!!!!!!!!!!!!");
    document.getElementById("go").innerHTML = "Status: Don't press!";
    if (hitThisTime) {
      document.getElementById("hit").innerHTML = "Result: HIT";
    } else if (doneOnce) {
      document.getElementById("hit").innerHTML = "Result: MISS";
    } else {
      document.getElementById("hit").innerHTML = "Result: NO INPUT";
    }
    if (outcomesArray[arrayCounter] == 1) {
      ball.x_speed = -30;
      ball.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 2) {
      ball.x_speed = 0;
      ball.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 3) {
      ball.x_speed = 30;
      ball.y_speed = 16;
    } else if (outcomesArray[arrayCounter] == 999) {
      ball.x_speed = 0;
      ball.y_speed = 0;
    } else if (outcomesArray[arrayCounter] == 888) {
      ball.x_speed = 0;
      ball.y_speed = 10;
    } else {
      alert("There's an issue! " + outcomesArray[arrayCounter] + " " + arrayCounter);
      console.log("There's an issue! " + outcomesArray[arrayCounter] + " " + arrayCounter);
    }
    ball.x += ball.x_speed;
    ball.y += ball.y_speed;
    if (ball.y > WINDOW_HEIGHT - 20) {
      ball.x = WINDOW_WIDTH/2;
      ball.y = 25;
      keyPressed = 0;
      if (arrayCounter < 199) {
        arrayCounter++;
        doneOnce = false;
        hitThisTime = false;
      } else {
        alert("You've finished the game! " + hitCounter);
        outcomesArray.push(999);
        arrayCounter = 200;
        ball.x = WINDOW_WIDTH/2;
        ball.y = 25;
        console.log("HIT: " + hitCounter + " MISS: " + missCounter + " %: " + hitCounter/200);
        console.log(hitCounter + missCounter);
      }
    }
    // console.log(performance.now());
  }
}

Ball.prototype.update = function(basket) {
  if (this.id == 2) {
    updateBall(this);
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
  ball2.update(player.basket);
};

function sleep(milliseconds) {
  var start = performance.now();
  for (var i = 0; i < 1e7; i++) {
    if ((performance.now() - start) > milliseconds){
      break;
    }
  }
}
