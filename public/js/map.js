
  //for map

  console.log("hello");
  var map = L.map('map').setView([ 29.2194, 79.5128], 13);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([29.2155, 79.5197]).addTo(map);


var circle = L.circle([29.2589, 79.5410], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);

marker.bindPopup("<b>Hello !</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);