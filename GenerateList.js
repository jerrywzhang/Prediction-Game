// Author: Jerry Zhang
var file = 'https://gist.githubusercontent.com/thejwzhang/af7517ff59667192288320db2205f6f8/raw/50e29433823b3746a5120e382a8604ef4d764189/Probabilities.txt'

var NUM_TRIES = 200;
var NUM_CMD = 4;
var NUM_POSSIBLE_OUTCOMES = 3;

var finalList = [];
var done = false;

function readFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", file, true);
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

function checkFile(linesFromFile, callback) {
  var lines = []; // This is a brand new array to hold the valid lines from the txt file in number format
  // console.log(linesFromFile);
  for (var i in linesFromFile) {
    var currentLine = linesFromFile[i];
    if (currentLine) {
      var splitNums = currentLine.split(" ");
      if (splitNums.length - 1 != NUM_POSSIBLE_OUTCOMES - 1) { // Make sure there are 2 spaces per line (3 items)
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
      } // end else: if (splitNums.length - 1 != NUM_POSSIBLE_OUTCOMES - 1)
    } // end if (currentLine)
  } // end for (var i in linesFromFile)

  if (lines.length != NUM_CMD*NUM_POSSIBLE_OUTCOMES) {
    console.log("ERROR: Not enough lines");
    alert("ERROR: Not enough lines! Check the probabilities.txt file!")
  }
  finalList = lines;
  console.log(finalList);
  done = true;
  callback(done);
}
