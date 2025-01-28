document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear();
    const inputField = document.getElementById('coords');
    const submitBtn = document.getElementById('saveCoords');

    submitBtn.addEventListener('click', function () {
        const inputValue = inputField.value;
        let text = inputValue;
        let pattern = /,/;
        if (pattern.test(text)) {
            let coords = text.split(',');
            let lat = localStorage.setItem("latitude", coords[0]);
            let lon = localStorage.setItem("longitude", coords[1]);
        }
    });
});

var map = L.map('map').setView([38.7946, 263.14453], 4);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e) {
    var popup = L.popup();
    var lat = e.latlng.lat.toFixed(2);
    var lon = e.latlng.lng.toFixed(2);
    if (lat > 180) {
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
    localStorage.setItem("latitude", lat.toFixed(2));
    localStorage.setItem("longitude", lon.toFixed(2));
});

function saveCoordsFromTextbox() {

}