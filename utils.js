function render(time) {
  var readableTime = parseMillisecondsIntoReadableTime(time);
  document.getElementById('timer').textContent = readableTime;
  document.title = readableTime;
}

function parseMillisecondsIntoReadableTime(milliseconds) {
  var sign = '';
  if (milliseconds < 0) {
    sign = '-';
    milliseconds = -milliseconds;
  }

  //Get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9
    ? absoluteHours
    : '0' + absoluteHours;
  h = h === "00" ? '' : h + ":"
  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9
    ? absoluteMinutes
    : '0' + absoluteMinutes;
    m = m === "00" ? '' : m + ":"

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.round(seconds);
  var s = absoluteSeconds;
  if (m && absoluteSeconds < 9) {
    s = '0' + s;
  }

  // Remove all 00: from the output string
  return (sign + h + m + s).replaceAll('00:', '');
}

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

function hideShowByState() {
  var displayMap = {
    '.hide-play': !play,
    '.hide-pause': !paused,
    '.show-play': play,
    '.show-pause': paused,
    '.show-play.hide-pause': play && !paused,
  };

  if (!play) {
    document.title = 'Overtimer';
  }

  for (var showClass in displayMap) {
    Array.from(document.querySelectorAll(showClass)).forEach(element => {
      element.style.display = displayMap[showClass] ? 'inline' : 'none';
    });
  }
}

function getTimeFromInputs() {
  const hour = +document.getElementById('hour-input').value;
  const minute = +document.getElementById('minute-input').value;
  const second = +document.getElementById('second-input').value;

  return (((((hour * 60) + minute) * 60) + second) * 1000);
}
