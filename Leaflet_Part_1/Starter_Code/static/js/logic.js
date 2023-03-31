//Create map
var map = L.map('map', {
    center: [37, -120],
    zoom: 5
});
//Create tile layer
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//Adding Map to Base Layer
baseLayer.addTo(map);
//Create Circle Markers
var circleMarker = L.circleMarker([50.5, 30.5]).addTo(map)

//Create Circle Markers; return a circle marker depending on data
// Import JSON dataset
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function (data) {
   console.log(data);
//Create function to assign color by depth
    function assignColor(depth){

        if (depth > 60){
            return 'red';
        }
        else if (depth > 20) {
            return 'yellow';
        }
        else{
            return 'green';
        }
    }
    
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: '#98ee00',
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //Apply color function; Determine radius of marker by magnitude.
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function (feature) {
            console.log(feature.geometry.coordinates[2])
        
                    return {
                        radius: feature.properties.mag *3,
                        fillColor: assignColor(feature.geometry.coordinates[2])
                    };
                 }
                }).bindPopup(function (layer) {
                         return layer.feature.properties.description;
    }).addTo(map);
});