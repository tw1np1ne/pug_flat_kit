const LIMIT = Math.tan(45 * 1.5 / 180 * Math.PI);

let pageWidth = window.innerWidth || document.body.clientWidth;
let threshold = Math.max(1,Math.floor(0.01 * (pageWidth)));

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const SWIPE_LEFT = new Event('swipe-left');
const SWIPE_RIGHT = new Event('swipe-right');
const SWIPE_UP = new Event('swipe-up');
const SWIPE_DOWN = new Event('swipe-down');
const TAP = new Event('click');

function handleGesture(e, element) {
  let x = touchendX - touchstartX;
  let y = touchendY - touchstartY;
  let xy = Math.abs(x / y);
  let yx = Math.abs(y / x);
  if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
    if (yx <= LIMIT) {
      if (x < 0) {
        element.dispatchEvent(SWIPE_LEFT);
      } else {
        element.dispatchEvent(SWIPE_RIGHT);
      }
    }
    if (xy <= LIMIT) {
      if (y < 0) {
        element.dispatchEvent(SWIPE_UP);
      } else {
        element.dispatchEvent(SWIPE_DOWN);
      }
    }
  } else {
    element.dispatchEvent(TAP);
  }
}


export function bindSwipe(element) {
  element.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
  }, false);

  element.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture(event, element);
  }, false);
}
