export function lazyLoad(w, d){
	var b = d.getElementsByTagName('body')[0];
	var s = d.createElement("script"); s.async = true;
	var v = !("IntersectionObserver" in w) ? "8.9.0" : "10.8.0";
	s.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
	w.lazyLoadOptions = {
    elements_selector: ".js-lazyload"
  }; // Your options here. See "recipes" for more information about async.
	b.appendChild(s);
}
