// Author: Jerry Zhang

// Variables to change


// Code starts here

var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BALL_RADIUS = 25;

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
  } else if (key == 50 || key == 98) {
    timePressed = performance.now();
    console.log("2 Pressed");
    keyPressed = 2;
    newKeyPressed = true;
  } else if (key == 51 || key == 99) {
    timePressed = performance.now();
    console.log("3 Pressed");
    keyPressed = 3;
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
  this.angle = 0;
}

Basket.prototype.render = function() {
  context.fillStyle = "#000000"; // black
  context.rotate(this.angle);
  context.fillRect(this.x, this.y, this.width, this.height);
  context.rotate(-this.angle);
};

function Player() {
   this.basket = new Basket(888, 888, 50, 10); // starts basket off the screen
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
  context.fillStyle = "#FFFFFF"; // hex color: white
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
var doneWithGame = false;
var startTime = 0;
var wasKeyPressedLastTime = false;

function updateBall(ball) {
  document.getElementById("go").innerHTML = "Status: Press 1, 2, or 3!";
  if (!newKeyPressed) { // wait until user keypress before moving the ball and going to next one
    ball.x_speed = 0;
    ball.y_speed = 0;
    ball.x = WINDOW_WIDTH/2;
    ball.y = WINDOW_HEIGHT/2;
  } else if (newKeyPressed && !wasKeyPressedLastTime) {
    if (keyPressed == outcomesArray[ball.counter] && !doneOnce) {
      hitCounter++;
      console.log("HIT");
      doneOnce = true;
      hitThisTime = true;
      keyPressed = 0;
    } else if (keyPressed != 0 && !doneOnce) {
      console.log("MISS");
      missCounter++;
      doneOnce = true;
      hitThisTime = false;
      keyPressed = 0;
    }
  } else {
    document.getElementById("go").innerHTML = "Status: Don't press!";
    if (hitThisTime) {
      document.getElementById("hit").innerHTML = "Result: HIT";
    } else if (doneOnce) {
      document.getElementById("hit").innerHTML = "Result: MISS";
    } else {
      document.getElementById("hit").innerHTML = "Result: NO INPUT";
    }
    if (outcomesArray[ball.counter] == 1) {
      ball.x_speed = 0;
      ball.y_speed = 14.76; // used pythagorean theorem from 2 and 3 to make sure this ball travels at the same speed
    } else if (outcomesArray[ball.counter] == 2) {
      ball.x_speed = -13;
      ball.y_speed = -7;
    } else if (outcomesArray[ball.counter] == 3) {
      ball.x_speed = 13;
      ball.y_speed = -7;
    } else if (outcomesArray[ball.counter] == 999) {
      ball.x_speed = 0;
      ball.y_speed = 0;
    } else if (outcomesArray[ball.counter] == 888) {
      ball.x_speed = 0;
      ball.y_speed = 10;
    } else {
      alert("There's an issue! " + outcomesArray[ball.counter] + " " + ball.counter);
      console.log("There's an issue! " + outcomesArray[ball.counter] + " " + ball.counter);
    }
    ball.x += ball.x_speed;
    ball.y += ball.y_speed;
    if (ball.y > WINDOW_HEIGHT - 20 || ball.x < 100 || ball.x > 600) {
      ball.x = WINDOW_WIDTH/2;
      ball.y = -25;
      keyPressed = 0;
      if (ball.id == 0 && ball.counter < 199) {
        ball.counter++;
        arrayCounter++;
        doneOnce = false;
        hitThisTime = false;
        startTime = performance.now();
        newKeyPressed = false;
      } else if (ball.id == 1 && ball.counter < 399) {
        ball.counter++;
        arrayCounter++;
        doneOnce = false;
        hitThisTime = false;
        startTime = performance.now();
        newKeyPressed = false;
      } else if (!doneWithGame) {
        alert("You've finished the game! " + hitCounter);
        outcomesArray.push(999);
        ballAppearArray.push(999);
        if (ball.id == 1) {
          ball.counter = 400;
        } else {
          ball.counter = 200;
        }
        ball.x = WINDOW_WIDTH/2;
        ball.y = WINDOW_HEIGHT+25;
        console.log("HIT: " + hitCounter + " MISS: " + missCounter + " %: " + hitCounter/200);
        console.log(hitCounter + missCounter);
        console.log(ball.id + " "  + ball.counter);
        doneWithGame = true;
      }
    }
  }
  wasKeyPressedLastTime = newKeyPressed;
}

Ball.prototype.update = function(basket) {
  if (this.id == ballAppearArray[arrayCounter]) {
    updateBall(this);
  }
};

Player.prototype.update = function() {
  var timeDifference = performance.now() - timePressed;
  if (timeDifference > 200) {
    this.basket.move(888, 888, 0); // off the screen
    keyPressed = 0;
  } else if (keyPressed == 1) {
    this.basket.move(WINDOW_WIDTH/2 - 25, WINDOW_HEIGHT-100, 0);
  } else if (keyPressed == 2) { // rotation matrix calculator used: http://www.wolframalpha.com/widgets/view.jsp?id=bd71841fce4a834c804930bd48e7b6cf
    this.basket.move(-15.1924, 236.603, -30); // calculated from rotation matrix for 30 degrees counterclockwise. xy coordinate in normal plane: (300-(100+12.5)*sqrt(3), 200+12.5)
  } else if (keyPressed == 3) {
    this.basket.move(484.808, -63.3975, 30); // calculated from rotation matrix for 30 degrees clockwise. xy coordinate in normal plane: (300+(100-12.5)*sqrt(3), 200-12.5)
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
