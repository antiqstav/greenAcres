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
    var lat = latlng.lat;
    var lon = latlng.lng;
    if (lat > 180 ) {
        lat -= 180;
        while (lat >= 180) {
            lat -= 180;
        }
    }
    else if (lat < -180) {
        lat += 180;
        while (lat <= -180) {
            lat += 180;
        }
    }
    if (lon > 180) {
        lon -= 180;
        while (lon >= 180) {
            lon -= 180;
        }
    }
    else if (lon < -180) {
        lon += 180;
        while (lon <= -180) {
            lon += 180;
        }
    }
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + lat + ", " + lon)
        .openOn(map);

    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);
});