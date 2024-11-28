var mapOptions = {
    center: [17.385044, 78.486671],
    zoom: 10
}
var map = new L.map('map', mapOptions);
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

const outputElement = document.getElementById('outTemp');
var popup = L.popup();

function getCoords(e) {
    var str = e.latlng.toString().substring(7, e.latlng.toString().length - 1);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + str)
        .openOn(map);
    str = str.split(",");
    var lat = str[0];
    var lon = str[1];
    localStorage.setItem('latitude', lat);
    localStorage.setItem('longitude', lon);
    console.log(lat, lon);
}

map.on('click', getCoords);