export function getTextWidth(text, font) {
  let element = document.getElementById("count");
  if (element) {
    element.style.fontSize = font;
    element.innerHTML = text;
    let width = element.clientWidth;
    element.innerHTML = '';
    return width;
  } else {
    return 0;
  }
}

export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}