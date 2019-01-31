// Author: Jerry Zhang

var NUMBER_OF_TOTAL_TRIES = 240;
var NUMBER_OF_DIFFERENT_PROBABILITIES = 3;
var TOLERANCE = 0.03;

var timesFile = 'https://gist.githubusercontent.com/thejwzhang/c3faadab6cd049689b1c6de5cfbcb32f/raw/9fded8502f8a1128157ca32e7e91796a9dfe9277/OneBallTimes.txt';
/*
Times.txt File Format:
a va ba
b vb bb
c vc bc
d vd bd
e ve be
f vf bf
g vg bg
h vh bh

where a through h are times in ms used as the mean times for the temporal test. va through vh are the variances. ba through bh are the box appear times
a-d are for ball 0
e-h are for ball 1
*/

readTimesFile(generateTimesArray);
// readFile(createOutcomes);

//Functions
var finalProbabilitiesList = [];
var outcomesArray = [];
var ballAppearArray = [];
var timeAppearArray = [];
var done = false;
var timesFileLines = [];
var timeReady = false;
var ballReady = false;
var blackBoxTimeArray = [];

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
        var gaussianRand = gaussian(Number(currentLineArray[0]), Number(currentLineArray[1]));
        var numberGenerated = 0;
        while (numberGenerated == 0 || numberGenerated < Number(currentLineArray[0]) - 3*Number(currentLineArray[1]) || numberGenerated > Number(currentLineArray[0]) + 3*Number(currentLineArray[1])) {
          console.log("NOT GOOD YET " + numberGenerated);
          numberGenerated = gaussianRand();
        }
        console.log("DONE " + numberGenerated);
        timeAppearArray.push(Math.round(numberGenerated));
        blackBoxTimeArray.push(currentLineArray[2]);
      }
    }
  }
  callback(done);
}

function gaussian(mean, stdev) {
  var y2;
  var use_last = false;
  return function() {
    var y1;
    if(use_last) {
       y1 = y2;
       use_last = false;
    }
    else {
      var x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w  = x1 * x1 + x2 * x2;
      } while (w >= 1.0){
        w = Math.sqrt((-2.0 * Math.log(w))/w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }
    }

    var retval = mean + stdev * y1;
    if(retval > 0) {
       return retval;
     }
     return -retval;
 }
}

function printTimeResult(done) {
  console.log("Times: " + timeAppearArray);
  timeReady = true;
}

var check = function() {
  if (timeReady === true) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(timeAppearArray) + "N" + encodeURI(blackBoxTimeArray);
    // TODO: Uncomment above
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(timeAppearArray);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Arrays.txt';
    hiddenElement.click();
    return;
  }
  setTimeout(check, 1000);
}

check();
