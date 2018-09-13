import './lib/modernizr/modernizr.js';
import './lib/jf-forms/jf-forms.js';

import { detectIE } from './lib/ua-sniff/ua-sniff.js';
import { lazyLoad } from './lib/lazyload/lazyload.js';
import { waypoints } from './lib/jf-waypoints/jf-waypoints.js';
import { updateClasses } from './lib/jf-menu/menu.js';
import { bindSwipe } from './lib/jf-menu/gestures.js';
import { initialiseCountdown } from './lib/jf-countdown/countdown.js';

import './lib/smoothscroll/smooth-scroll.min.js';
import './lib/mediabox/mediabox.js';

/**
 * [NAV_ITEMS description]
 * @type {Object}
 */
const NAV_ITEMS = {
  'button': {
    el: document.querySelector(".js-hamburger"),
    class: 'hamburger--active'
  },
  'nav': {
    el: document.querySelector('.header__nav'),
    class: 'header__nav--active'
  },
  'body': {
    el: document.querySelector('body'),
    class: 'body--nav-active'
  }
}

const WAYPOINT = document.querySelectorAll('.js-waypoint');
const EVENT_DATE = 'September 27 2018 09:30:00 GMT+0100';

/**
 * [description]
 * @return {[type]} [description]
 */
document.addEventListener("DOMContentLoaded", function(){

  if (detectIE() >= 12) {
    document.getElementsByTagName('body')[0].classList.add('ua-edge');
  }

  let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      menuLinks = document.getElementsByClassName('navigation__item');

  lazyLoad(window, document);
  initialiseCountdown('js-countdown', EVENT_DATE);
  MediaBox('.js-mediabox');

  let scroll = new SmoothScroll('a[href*="#"]', {
    'header': windowWidth < 992 ? '.header' : null
  });

  /**
   * [waypoint description]
   * @type {[type]}
   */
  WAYPOINT.forEach(waypoint => {
    waypoints.observe(waypoint);
  });

  /**
   *
   */
  bindSwipe(NAV_ITEMS.body.el);
  NAV_ITEMS.button.el.addEventListener("click", () => updateClasses(NAV_ITEMS));
  NAV_ITEMS.body.el.addEventListener('swipe-right', () => updateClasses(NAV_ITEMS, 'reset'));
  for(let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => updateClasses(NAV_ITEMS, 'reset'));
  }
});

caches.delete('images-cache');

navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} })

//
// /**
//  * [if description]
//  * @param  {[type]} serviceWorker [description]
//  * @return {[type]}               [description]
//  */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     location.protocol === 'https:' && navigator.serviceWorker.register('/sw.js');
//   });
// }
