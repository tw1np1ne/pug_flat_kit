function splitTime(time) {
  let timeSplitArray = time.toString().split('');
  if (timeSplitArray.length < 2) {
    timeSplitArray.unshift('0');
  }
  return timeSplitArray;
}

/**
 * Remaining time between now and endtime.
 * Returns an object of the total time remaining and each individual unit
 * @param  {string} endtime A valid string that can be parsed by Date
 * @return {object}         Time units (hours, mins etc.) and total time.
 */
function getTimeRemaining(endtime){
  const T = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor( (T/1000) % 60 ),
      minutes = Math.floor( (T/1000/60) % 60 ),
      hours = Math.floor( (T/(1000*60*60)) % 24 ),
      days = Math.floor( T/(1000*60*60*24) );
  return {
    'total': T,
    'days': splitTime(days),
    'hours': splitTime(hours),
    'minutes': splitTime(minutes),
    'seconds': splitTime(seconds),
  };
}

/**
 * Find children of the provided parent that match specific sub-classes.
 * The NodeList that is returned is bound to an object for iterating over later.
 * @param  {string} className Class of the parent countdown element
 * @return {object}           Object of NodeLists
 */
function getChildElements(className){
  let clockDays = document.querySelectorAll(`.${className} .${className}--days`),
      clockHours = document.querySelectorAll(`.${className} .${className}--hours`),
      clockMinutes = document.querySelectorAll(`.${className} .${className}--minutes`),
      clockSeconds = document.querySelectorAll(`.${className} .${className}--seconds`);
  return {
    'days' : clockDays,
    'hours' : clockHours,
    'minutes' : clockMinutes,
    'seconds': clockSeconds
  }

}

/**
 * [initialiseCountdown description]
 * @param  {[type]} className [description]
 * @param  {[type]} endtime   [description]
 * @return {[type]}           [description]
 */
export function initialiseCountdown(className, endtime){
  let clock = document.getElementsByClassName(className),
      els = getChildElements(className);

  var timeinterval = setInterval(function(){
    let t = getTimeRemaining(endtime);

    for (let element in els) {
      for (let i = 0; i < element.length; i++) {
        if(els[element][i] !== undefined && els[element][i].innerHTML != t[element][i]) {
          els[element][i].innerHTML = t[element][i];
        }
      }
    }
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
}
