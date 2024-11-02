var elements = document.getElementsByClassName("column");

// Grid View
function getView() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = "50%";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const columns = document.querySelectorAll(".column");

  columns.forEach(column => {
      column.addEventListener("click", function() {
          this.classList.toggle("expanded");
      });
  });
});