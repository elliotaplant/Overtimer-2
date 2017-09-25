var paused;
var pauseTime;
var startTime;
var subscription;
var elapsedPauseTime;
var inOvertime = false;
var play = false;

function createTimer() {
  var time = getTimeFromInputs();
  var netElapsedTime = 0;
  elapsedPauseTime = 0;
  paused = false;
  play = true;
  startTime = Date.now();
  inOvertime = false;

  hideShowByState();

  subscription = Rx.Observable.interval(100)
    .startWith(Date.now())
    .timestamp()
    .subscribe(update => {
      if (!paused) {
        netElapsedTime = update.timestamp - startTime - elapsedPauseTime;
      }
      var timeLeft = time - netElapsedTime
      if (timeLeft < 0 && !inOvertime) {
        enterOvertime();
      }
      render(timeLeft);
    });
}

function togglePause() {
  if (paused) {
    unPause();
  } else {
    pause();
  }
  hideShowByState();
}
function pause() {
  paused = true;
  pauseTime = Date.now();
}
function unPause() {
  paused = false;
  elapsedPauseTime += Date.now() - pauseTime;
  pauseTime = null;

}

function stop() {
  subscription && subscription.unsubscribe();
  play = false;
  paused = false;
  stopAudio();
  hideShowByState();
}

// Start render cyle
hideShowByState();
