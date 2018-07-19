// Author: Jerry Zhang

// Variables
var NUMBER_OF_TRIALS = 100; // this is per ball. Make sure it's 200 or less.
var TIME_TO_WAIT = 2000; // in ms
var BREAK_TIME = 1000; // in ms

// Code starts here
var WINDOW_WIDTH = 600;
var WINDOW_HEIGHT = 600;
var BALL_RADIUS = 25;

var keyPressArray = [];

var timePressed = 0;
var keyPressed = 0;
var lastKeyPressed = 0;
var newKeyPressed = false;

document.addEventListener("keydown", function(event) {
  if (!breakTimeBool) {
    var key = event.keyCode;
    if (!newKeyPressed) {
      if (lastKeyPressed == key) {
        keyPressed = 0;
        console.log("HELD DOWN");
      } else if (key == 49 || key == 97 || key == 37) {
        timePressed = performance.now();
        console.log("1 Pressed");
        keyPressed = 1;
        newKeyPressed = true;
        displayRectangle = true;
      } else if (key == 50 || key == 98 || key == 38) {
        timePressed = performance.now();
        console.log("2 Pressed");
        keyPressed = 2;
        newKeyPressed = true;
        displayRectangle = true;
      } else if (key == 51 || key == 99 || key == 39) {
        timePressed = performance.now();
        console.log("3 Pressed");
        keyPressed = 3;
        newKeyPressed = true;
        displayRectangle = true;
      } else {
        // console.log("Key Number " + key + " Pressed");
        keyPressed = 0;
        newKeyPressed = false;
      }
      lastKeyPressed = key;
    }
  }
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
  this.angle = 0;
}

Basket.prototype.render = function() {
  context.fillStyle = "#FFFFFF"; // white
  context.rotate(this.angle);
  context.fillRect(this.x, this.y, this.width, this.height);
  context.rotate(-this.angle);
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

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
};

var player = new Player();
var ball = new Ball("#0000FF", 0, 0);
var ball2 = new Ball("#FF0000", 1, 200);

var arrayCounter = 0;
var hitCounter = 0;
var missCounter = 0;
var doneOnce = false;
var hitThisTime = false;
var doneWithGame_Ball0 = false;
var doneWithGame_Ball1 = false;
var startTime = 0;
var displayRectangle = false;
var run = true;
var breakTimeBool = false;

var render = function() {
  context.fillStyle = context.createPattern(image, "no-repeat");
  if (performance.now() - startTime < BREAK_TIME) {
    breakTimeBool = true;
    context.fillRect(0, 0, width, height);
    document.getElementById("go").innerHTML = "Status: Break!";
    // keyPressed = 0;
    // doneOnce = false;
    // hitThisTime = false;
  } else {
    breakTimeBool = false;
    context.fillRect(0, 0, width, height);
    player.render();
    ball.render();
    ball2.render();
  }
};

function updateBall(ball) {
  if (ball.id == 0 & doneWithGame_Ball0) {
    run = false;
    console.log("Ball 0 done.");
  } else if (ball.id == 1 && doneWithGame_Ball1) {
    run = false;
    console.log("Ball 1 done.");
  } else {
    run = true;
  }
  if (run) {
    timeRemaining = TIME_TO_WAIT + BREAK_TIME - performance.now() + startTime;
    if (performance.now() - startTime < TIME_TO_WAIT + BREAK_TIME) { // wait before moving the ball and going to break time
      document.getElementById("go").innerHTML = "Status: Press 1, 2, or 3 in the next " + Math.round(timeRemaining/1000 + 0.5) + " seconds!";
      // console.log(startTime);
      ball.x_speed = 0;
      ball.y_speed = 0;
      ball.x = WINDOW_WIDTH/2;
      ball.y = WINDOW_HEIGHT/2;
      if (keyPressed == outcomesArray[ball.counter] && !doneOnce) {
        displayRectangle = true;
        keyPressArray.push(keyPressed);
        hitCounter++;
        console.log("HIT");
        doneOnce = true;
        hitThisTime = true;
        keyPressed = 0;
      } else if (keyPressed != 0 && !doneOnce) {
        displayRectangle = true;
        keyPressArray.push(keyPressed);
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
        arrayCounter++;
        doneOnce = false;
        hitThisTime = false;
        startTime = performance.now();
        newKeyPressed = false;
        if (ball.id == 0 && ball.counter < NUMBER_OF_TRIALS - 1) {
          ball.counter++;
        } else if (ball.counter == NUMBER_OF_TRIALS - 1) {
          doneWithGame_Ball0 = true;
        }
        if (ball.id == 1 && ball.counter < 200 + NUMBER_OF_TRIALS - 1) {
          ball.counter++;
        } else if (ball.counter == 200 + NUMBER_OF_TRIALS - 1) {
          doneWithGame_Ball1 = true;
        }
        displayRectangle = false;
      }
    }
  } else {
    arrayCounter++;
    keyPressed = 0;
    doneOnce = false;
    hitThisTime = false;
  }
}

var ranAlertAlready = false;

function finishedAlert(ball) {
  if (!ranAlertAlready) {
    alert("You've finished the game! " + hitCounter);
    console.log("HIT: " + hitCounter + " MISS: " + missCounter + " %: " + 100*(hitCounter/(NUMBER_OF_TRIALS*2)));
    console.log(hitCounter + missCounter);
    console.log(keyPressArray);
    saveVariableToFile("outcome", hitCounter + " " + missCounter + " " + keyPressArray);
    ranAlertAlready = true;
  }
  if (ball.id == 1) {
    ball.counter = 400;
  } else {
    ball.counter = 200;
  }
  ball.x = WINDOW_WIDTH/2;
  ball.y = WINDOW_HEIGHT/2;
  ball.x_speed = 0;
  ball.y_speed = 0;
}

Ball.prototype.update = function(basket) {
  if (this.id == ballAppearArray[arrayCounter] && !ranAlertAlready) {
    updateBall(this);
  }
  if (doneWithGame_Ball0 && doneWithGame_Ball1) {
    finishedAlert(this);
  }
};

Player.prototype.update = function() {
  // var timeDifference = performance.now() - timePressed;
  // console.log(displayRectangle);
  if (!displayRectangle) {
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

function saveVariableToFile(name, variable) {
  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(variable);
  hiddenElement.target = '_blank';
  hiddenElement.download = name + '.txt';
  hiddenElement.click();
}
