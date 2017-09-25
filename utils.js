function render(time) {
  var readableTime = parseMillisecondsIntoReadableTime(time);
  document.getElementsByClassName('rx-title')[0].textContent = readableTime;
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

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9
    ? absoluteMinutes
    : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.round(seconds);
  var s = absoluteMinutes > 0
    ? '0' + absoluteSeconds
    : absoluteSeconds;

  // Remove all 00: from the output string
  return (sign + h + ':' + m + ':' + s).replaceAll('00:', '');
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
  console.log('displayMap',displayMap);
  for (var showClass in displayMap) {
    Array.from(document.querySelectorAll(showClass)).forEach(element => {
      element.style.display = displayMap[showClass] ? 'inline' : 'none';
    });
  }
}
