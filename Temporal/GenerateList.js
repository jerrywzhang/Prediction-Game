// Author: Jerry Zhang

var NUMBER_OF_TOTAL_TRIES = 200;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 8;
var TOLERANCE = 0.04;
var probabilitiesFile = 'http://jwzhang.com/game/Assets/Probabilities.txt';
/*
Probabilities.txt File Format:

1|Num1 Num2 Num3
2|Num1 Num2 Num3
3|Num1 Num2 Num3
4|Num1 Num2 Num3
5|Num1 Num2 Num3
6|Num1 Num2 Num3
7|Num1 Num2 Num3
8|Num1 Num2 Num3

Lines 1-4: Probabilities for ball 1
Lines 5-8: Probabilities for ball 2
Lines 1-8: The 3 numbers in each line add up to 1.
*/

var timesFile = 'http://jwzhang.com/game/Assets/Times.txt';
/*
Times.txt File Format:
a va
b vb
c vc
d vd
e ve
f vf
g vg
h vh

where a through h are times in ms used as the mean times for the temporal test. va through vh are the variances
a-d are for ball 0
e-h are for ball 1
*/

readTimesFile(generateTimesArray);
readFile(createOutcomes);

//Functions
var finalProbabilitiesList = [];
var outcomesArray = [];
var ballAppearArray = [];
var timeAppearArray = [];
var done = false;
var timesFileLines = [];
var timeReady = false;
var ballReady = false;

function readFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", probabilitiesFile, true);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Ready to parse
      if (txtFile.status === 200) {  // File found
        allText = txtFile.responseText;
        lines = allText.split("\n"); // Separates each line into an array
        // console.log(lines);
        callback(lines, getResult);
      }
    }
  }
  txtFile.send(null);
}

function createOutcomes(linesFromFile, callback) { // Creates 2 lists: one list for which place (1,2, or 3) a ball is going. The other for which ball appears (1 or 2)
  // Create list for which ball appears: either 0 or 1.
  for (var i = 0; i < NUMBER_OF_TOTAL_TRIES; i++) {
    ballAppearArray.push(Math.floor(Math.random() * Math.floor(2)));
  }

  // Create list for which place a ball is going
  var NUMBER_OF_POSSIBLE_OUTCOMES = 3;

  var lines = []; // This is a brand new array to hold the valid lines from the txt file in number format
  // console.log(linesFromFile);
  for (var i in linesFromFile) {
    var currentLine = linesFromFile[i];
    if (currentLine) {
      var splitNums = currentLine.split(" ");
      if (splitNums.length != NUMBER_OF_POSSIBLE_OUTCOMES) { // Make sure there are 3 items per line
        console.log("ERROR:  Incorrect number of items");
        alert("ERROR: Incorrect number of items!. Check the probabilities.txt file!");
      } else {
        // console.log(splitNums);
        var tempAdd = 0;
        for (var num in splitNums) {
          var a = Number(splitNums[num]);
          tempAdd = tempAdd + a;
          if (num == 2) {
            if (tempAdd != 1) {
              var lineNum = Number(i)+1;
              console.log("ERROR: Probability for line " +  lineNum + " doesn't add up to 1. It adds up to " + tempAdd + ".");
              alert("ERROR: Probability for line " + lineNum + " doesn't add up to 1. It adds up to " + tempAdd + ". Check the probabilities.txt file!");
            }
          }
          if (!isNaN(a)) {
            lines.push(a);
          } else {
            console.log("ERROR: One or more of the items in the file is not a number.");
            alert("ERROR: One or more of the items in the file is not a number. Check the probabilities.txt file!");
          } // end else: if (!isNaN(a))
        } // end for (var num in splitNums)
      } // end else: if (splitNums.length - 1 != NUMBER_OF_POSSIBLE_OUTCOMES - 1)
    } // end if (currentLine)
  } // end for (var i in linesFromFile)

  if (lines.length != NUMBER_OF_DIFFERENT_PROBABILITIES*NUMBER_OF_POSSIBLE_OUTCOMES) {
    console.log("ERROR: Not enough lines");
    alert("ERROR: Not enough lines! Check the probabilities.txt file!")
  }
  finalProbabilitiesList = lines;
  // console.log(finalProbabilitiesList);

  // Create an array of each of the trials using a random number generator
  for (i = 0; i < finalProbabilitiesList.length; i+=NUMBER_OF_POSSIBLE_OUTCOMES) {
    var trueProb1 = -10;
    var trueProb2 = -10;
    var trueProb3 = -10;
    var tempOutcomesArray = [];
    while (Math.abs(finalProbabilitiesList[i] - trueProb1) > TOLERANCE) {
      tempOutcomesArray = [];
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      for (j = 0; j < (NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES); j++) {
        var currentVal = Math.random();
        if (currentVal < finalProbabilitiesList[i]) {
          tempOutcomesArray.push(1);
          count1++;
        } else if (currentVal < finalProbabilitiesList[i] + finalProbabilitiesList[i+1]) {
          tempOutcomesArray.push(2);
          count2++;
        } else {
          tempOutcomesArray.push(3);
          count3++;
        }
      }
      trueProb1 = count1/(NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES);
      trueProb2 = count2/(NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES);
      trueProb3 = count3/(NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES);
      console.log("Given Probabilities: " + finalProbabilitiesList[i] + " " + finalProbabilitiesList[i+1] + " " + finalProbabilitiesList[i+2]);
      console.log("True Probabilities: " + trueProb1 + " " + trueProb2 + " " + trueProb3);
      // console.log("T " + (Math.abs(finalProbabilitiesList[i] - trueProb1) > TOLERANCE));
    }
    outcomesArray = outcomesArray.concat(tempOutcomesArray);
  }

  // console.log(outcomesArray);
  done = true;
  callback(done);
}

function getResult(done) { // called as the callback of createOutcomes
  // console.log(done);
  if (done != true) { // should always be true to mean that the array has been succesfully created
    alert("The array was not created properly!");
    console.log("The array was not created properly!");
  }
  console.log(outcomesArray);
  ballReady = true;
}


function readTimesFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", timesFile, true);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Ready to parse
      if (txtFile.status === 200) {  // File found
        allText = txtFile.responseText;
        timesFileLines = allText.split("\n"); // Separates lines
        // console.log(lines);
        callback(printTimeResult);
      }
    }
  }
  txtFile.send(null);
}

function generateTimesArray(callback) {
  for (var time in timesFileLines) {
    var currentLineArray = timesFileLines[time].split(" "); // separate mean from variance
    if (currentLineArray[0] > 0) {
      for (var i = 0; i < NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES; i++) {
        timeAppearArray.push(gaussianRand(currentLineArray[0], currentLineArray[1]));
      }
    }
  }
  callback(done);
}

function gaussianRand(mean, variance) { // using polar method. from http://blog.yjl.im/2010/09/simulating-normal-random-variable-using.html
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);

  X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  // Y = Math.sqrt(-2 * Math.log(S) / S) * V2;
  X = Number(mean) + Math.sqrt(variance) * X;
  // Y = mean + Math.sqrt(variance) * Y ;
  return X;
}

function printTimeResult(done) {
  console.log("Times: " + timeAppearArray);
  timeReady = true;
}

var check = function() {
  if (timeReady === true && ballReady === true) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(outcomesArray) + "N" + encodeURI(ballAppearArray) + "N" + encodeURI(timeAppearArray);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Arrays.txt';
    hiddenElement.click();
    return;
  }
  setTimeout(check, 1000);
}

check();
