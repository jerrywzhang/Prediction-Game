// Author: Jerry Zhang

var arraysFile = 'https://gist.githubusercontent.com/thejwzhang/6ad2b58a35de10f15b71856d5e30b212/raw/70e09c67ffb3aeb2d4e699ad7208faec1e9b07b5/Arrays.txt';
/*
Arrays.txt File Format:
x,y,z,a,b,....Nx,y,z,a,b,c....

where all letters besides "N" are numbers separated by commas.
N separates the 2 arrays.
First array: 1, 2, or 3 for where the ball will end up
Second array: 0 or 1 for which ball
*/

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
  pushToArray(1, ballAppearArray);

  done = true;
  callback(done);
}

function pushToArray(num, array) {
  var currentLine = lines[num]; // first array
  var splitNums = currentLine.split(",");
  if (splitNums.length != 200) { // Make sure there are 200 items per line
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
  } // end else: if (splitNums.length != 200)
}

function getResult(done) { // called as the callback of createOutcomes
  // console.log(done);
  if (done != true) { // should always be true to mean that the array has been succesfully created
    alert("The array was not created properly!");
    console.log("The array was not created properly!");
  }
  console.log(outcomesArray);
  console.log(ballAppearArray);
}
