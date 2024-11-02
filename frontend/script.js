var elements = document.getElementsByClassName("column");

// Grid View
function getView() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = "50%";
  }
}