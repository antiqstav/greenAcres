// Initialize the map
var map = L.map('map').setView([38.7946, 263.14453], 5);

// Add a tile layer to the map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a click event listener to the map
map.on('click', function(e) {
    var latlng = e.latlng;
    var popup = L.popup();
    var coordinates = latlng.lat + ", " + latlng.lng;
    document.getElementById('coordinates').value = coordinates;
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString().substring(7, e.latlng.toString().length - 1))
        .openOn(map);
    localStorage.setItem("latitude", latlng.lat);
    localStorage.setItem("longitude", latlng.lng);
});

function getAPI() {
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
            return temp;
        })
    return -1;
}