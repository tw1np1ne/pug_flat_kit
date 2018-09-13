export function updateClasses (object, method) {
  for (var element in object) {
    let el = object[element].el;
    let className = object[element].class;

    if (method == 'reset') {
      el.classList.remove(className);
    } else {
      el.classList.toggle(className);
    }
  }
}
