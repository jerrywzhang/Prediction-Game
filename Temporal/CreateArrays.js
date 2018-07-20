// Author: Jerry Zhang

var arraysFile = 'https://raw.githubusercontent.com/thejwzhang/Prediction-Game/master/Assets/Arrays.txt?token=AL5t4Ac-12xUDScWMHZmnboXvevl5HALks5bWz6GwA%3D%3D';
/*
Arrays.txt File Format:
x,y,z,a,b,....Nx,y,z,a,b,c....

where all letters besides "N" are numbers separated by commas.
N separates the 2 arrays.
First array: 1, 2, or 3 for where the ball will end up
Second array: 0 or 1 for which ball
*/

var timesFile = 'https://raw.githubusercontent.com/thejwzhang/Prediction-Game/master/Assets/Times.txt?token=AL5t4OLC7dr9yEUt5NOth4yKK_FRShzeks5bWz6qwA%3D%3D'
/*
Times.txt File Format:
a
b
c
d

where a, b, c, and d are times in ms used as the mean times for the temporal test.
*/

// IF YOU CHANGE THESE TWO VARIABLES, MAKE SURE YOU CHANGE THEM IN GenerateList.js AS WELL
var NUMBER_OF_TOTAL_TRIES = 400;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 8;

readArraysFile(createOutcomes);
readTimesFile(generateTimesArray);

//Functions
var outcomesArray = [];
var ballAppearArray = [];
var timeAppearArray = [];
var done = false;
var lines = [];
var timesFileLines = [];

function readArraysFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", arraysFile, true);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Ready to parse
      if (txtFile.status === 200) {  // File found
        allText = txtFile.responseText;
        lines = allText.split("N"); // Separates the two arrays by looking for "N"
        // console.log(lines);
        callback(getResult);
      }
    }
  }
  txtFile.send(null);
}

function readTimesFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", timesFile, true);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Ready to parse
      if (txtFile.status === 200) {  // File found
        allText = txtFile.responseText;
        timesFileLines = allText.split("\n"); // Separates the two arrays by looking for "N"
        // console.log(lines);
        callback(printTimeResult);
      }
    }
  }
  txtFile.send(null);
}

function createOutcomes(callback) { // Converts strings to numbers
  pushToArray(0, outcomesArray);
  pushToArray(1, ballAppearArray);

  done = true;
  callback(done);
}

function generateTimesArray(callback) {
  for (var time in timesFileLines) {
    if (timesFileLines[time] > 0) {
      for (var i = 0; i < NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES; i++) {
        timeAppearArray.push(Math.round((gaussianRand() * 500) - 250 + Number(timesFileLines[time]))); // range: 500. mean: time.
      }
    }
  }
  callback(done);
}

function gaussianRand() { // generates an approximately Gaussian random number distributed from 0 to 1.
  var rand = 0;
  for (var i = 0; i < 6; i++) {
    rand += Math.random();
  }
  return rand / 6;
}

function pushToArray(num, array) {
  var currentLine = lines[num]; // arrays
  var splitNums = currentLine.split(",");
  if (splitNums.length != NUMBER_OF_TOTAL_TRIES) { // Make sure there are 400 items per line
    console.log("ERROR:  Incorrect number of items");
    alert("ERROR: Incorrect number of items!. Check the Arrays.txt file!");
  } else {
    for (var num in splitNums) {
      var a = Number(splitNums[num]);
      if (!isNaN(a)) {
        array.push(a);
      } else {
        console.log("ERROR: One or more of the items in the file is not a number.");
        alert("ERROR: One or more of the items in the file is not a number. Check the Arrays.txt file!");
      } // end else: if (!isNaN(a))
    } // end for (var num in splitNums)
  } // end else: if (splitNums.length != NUMBER_OF_TOTAL_TRIES)
}

function getResult(done) { // called as the callback of createOutcomes
  // console.log(done);
  if (done != true) { // should always be true to mean that the array has been succesfully created
    alert("The array was not created properly!");
    console.log("The array was not created properly!");
  }
  console.log("Outcomes: " + outcomesArray);
  console.log("Which Ball: " + ballAppearArray);
}

function printTimeResult(done) {
  if (done != true) {
    alert("The time array was not created properly!");
    console.log("The time array was not created properly!");
  }
  console.log("Times: " + timeAppearArray);
}
