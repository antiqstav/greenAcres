document.addEventListener("DOMContentLoaded", function () {
  const columns = document.querySelectorAll(".column");

  columns.forEach(column => {
    column.addEventListener("click", function () {
      this.classList.toggle("expanded");
    });
  });

  const lat = Number(localStorage.getItem("latitude"));
  const lon = Number(localStorage.getItem("longitude"));

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const weather = data.current_weather;
      const temp = weather.temperature;
      const coords = document.getElementById("coords");
      coords.textContent = `Temperature in Fahrenheit for Latitude: ${lat}, Longitude: ${lon} is ${temp}°F`;
    })
});