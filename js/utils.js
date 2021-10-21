let $_ = function(selector, node = document) {
  return node = document.querySelector(selector)
}

let $$_ = function(selector, node = document) {
  return node = document.querySelectorAll(selector)
}

const createElement = function (tagName, className, text) {
  let element = document.createElement(tagName);
  element.setAttribute("class", className);
  if (text) {
    element.textContent = text;
  }

  return element;
};