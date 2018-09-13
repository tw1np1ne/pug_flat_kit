export let waypoints = new IntersectionObserver((elements) => {
  elements.forEach(element => {
    if (element.intersectionRatio > 0) {
      element.target.classList.add('js-waypoint--in-viewport');
      waypoints.unobserve(element.target);
    }
  });
}, {
  rootMargin: '300px 0px'
});
