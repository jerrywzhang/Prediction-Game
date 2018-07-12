// Author: Jerry Zhang

var NUMBER_OF_TOTAL_TRIES = 200;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 4;
var probabilitiesFile = 'https://gist.githubusercontent.com/thejwzhang/af7517ff59667192288320db2205f6f8/raw/50e29433823b3746a5120e382a8604ef4d764189/Probabilities.txt';
/*
Probabilities.txt File Format:

1|Num1 Num2 Num3
2|Num1 Num2 Num3
3|Num1 Num2 Num3
4|Num1 Num2 Num3

Lines 1-4: The 3 numbers in each line add up to 1.
*/


readFile(createOutcomes);

//Functions
var finalProbabilitiesList = [];
var outcomesArray = [];
var ballAppearArray = [];
var done = false;

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
  for (i = 0; i < NUMBER_OF_TOTAL_TRIES; i++) {
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
      if (splitNums.length - 1 != NUMBER_OF_POSSIBLE_OUTCOMES - 1) { // Make sure there are 2 spaces per line (3 items)
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
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    for (j = 0; j < (NUMBER_OF_TOTAL_TRIES/NUMBER_OF_DIFFERENT_PROBABILITIES); j++) {
      var currentVal = Math.random();
      if (currentVal < finalProbabilitiesList[i]) {
        outcomesArray.push(1);
        count1++;
      } else if (currentVal < finalProbabilitiesList[i] + finalProbabilitiesList[i+1]) {
        outcomesArray.push(2);
        count2++;
      } else {
        outcomesArray.push(3);
        count3++;
      }
    }
    console.log("Given Probabilities: " + finalProbabilitiesList[i] + " " + finalProbabilitiesList[i+1] + " " + finalProbabilitiesList[i+2]);
    console.log("True Probabilities: " + count1/50 + " " + count2/50 + " " + count3/50);
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

  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(outcomesArray) + "N" + encodeURI(ballAppearArray);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'Arrays.txt';
  hiddenElement.click();
}
