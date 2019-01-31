// Author: Jerry Zhang

var arraysFile = 'https://gist.githubusercontent.com/thejwzhang/6f96e7d702581026a82014cef3f64484/raw/051ac965973abd9c2f49247111ec7cbde96538f8/OneBallArray.txt';
/*
Arrays.txt File Format:
x,y,z,a,b,....Nx,y,z,a,b,c....

where all letters besides "N" are numbers separated by commas.
N separates the 2 arrays.
First array: 1, 2, or 3 for where the ball will end up
Second array: 0 or 1 for which ball
*/

// IF YOU CHANGE THESE TWO VARIABLES, MAKE SURE YOU CHANGE THEM IN GenerateList.js AS WELL
var NUMBER_OF_TOTAL_TRIES = 240;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 3;

readFile(createOutcomes);

//Functions
var outcomesArray = [];
var ballAppearArray = [];
var done = false;
var lines = [];

function readFile(callback) {
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

function createOutcomes(callback) { // Converts strings to numbers
  pushToArray(0, outcomesArray);

  done = true;
  callback(done);
}

function pushToArray(num, array) {
  var currentLine = lines[num]; // first array
  var splitNums = currentLine.split(",");
  if (splitNums.length != NUMBER_OF_TOTAL_TRIES) { // Make sure there are 200 items per line
    console.log("ERROR:  Incorrect number of items " + splitNums.length);
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
