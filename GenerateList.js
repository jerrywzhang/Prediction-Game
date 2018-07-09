// Author: Jerry Zhang
var file = 'C:/Users/lingchen/AutismProject/Probabilities.txt'

var NUM_TRIES = 200;
var NUM_CMD = 4;
var NUM_POSSIBLE_OUTCOMES = 3;

function readFile(callback) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", "file://" + file, true);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Ready to parse
      if (txtFile.status === 200) {  // File found
        allText = txtFile.responseText;
        lines = allText.split("\n"); // Separates each line into an array
        // console.log(lines);
        callback(lines);
      }
    }
  }
  txtFile.send(null);
}

readFile(function(linesFromFile) { // callback checks to make sure the file is valid and converts string to numbers
  var lines = []; // This is a brand new array to hold the valid lines from the txt file in number format
  // console.log(linesFromFile);
  for (var i in linesFromFile) {
    var currentLine = linesFromFile[i];
    if (currentLine) {
      var splitNums = currentLine.split(" ");
      if (splitNums.length - 1 != NUM_POSSIBLE_OUTCOMES - 1) { // Make sure there are 2 spaces per line (3 items)
        console.log("ERROR:  Incorrect number of items");
        alert("ERROR: Incorrect number of items");
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
              alert("ERROR: Probability for line " + lineNum + " doesn't add up to 1. It adds up to " + tempAdd + ".");
            }
          }

          if (!isNaN(a)) {
            lines.push(a);
          } // end if (!isNaN(a))
        } // end for (var num in splitNums)
      } // end else: if (splitNums.length - 1 != NUM_POSSIBLE_OUTCOMES - 1)
    } // end if (currentLine)
  } // end for (var i in linesFromFile)

  if (lines.length != NUM_CMD*NUM_POSSIBLE_OUTCOMES) {
    console.log("ERROR: Not enough lines");
  }
  console.log(lines);
});
