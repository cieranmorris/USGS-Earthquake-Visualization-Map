console.log("logic.js file is loaded")

//Create function to coordinate earthquake color based on depth
function depthColor(depth) {
  var color = "";
  if(depth > 90) {
    color = "#ff3333"
  } else if(depth >70){
    color = "#ff5c33"
  } else if (depth > 50) {
    color = "#ffad33"
  } else if (depth > 30) {
    color = "#ffd633"
  } else if (depth > 10) {
    color = "#ccff33"
  } else if (depth > -10) {
    color = "#99ff33"
  };
  return color
}

//Function for coordinating earthquake magnitude?
function getRadius(magnitude) {
  var magnitude = "";

}

//Store API endpoint inside a queryUrl
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//Creating static tile maps
var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

//Create base map objects
    var baseMaps = {
      "Satellite_Map": satellitemap,
      "Dark_Map": darkmap,
      "Light_Map": lightmap
    };

// Create the map, giving it the satellite layer to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [baseMaps.Satellite_Map]
});

//Define earthquake layer and overlays
var earthquakes = new L.LayerGroup();
var overlays = {Earthquakes: earthquakes}


//Perform a GET request to the query URL
d3.json(geoData).then(function(data) {
    console.log(data)
  //Load GeoJSON data and create circle markers based on lat/lng coordinates
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
  },
    //Color coordinate fill color of circles based on depth of earthquakes
    style: function (feature) {
      return {
        radius: feature.properties.mag*5,
        fillColor: depthColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }
    },
    // Give each feature a popup describing the place and time of the earthquake
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3> Location: &nbsp" + feature.properties.place +
        "</h3><hr><p> Date & Time: &nbsp" + new Date(feature.properties.time) + "</p>" + "<h3> Magnitude: &nbsp" + feature.properties.mag);
    }
  }).addTo(myMap);

  //Create a legend control object
  var legend = L.control({
    position: "bottomright",
  });

  //Add in details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [-10, 10, 30, 50, 70, 90];
    var colors = [
      "#99ff33",
      "#ccff33",
      "#ffd633",
      "#ffad33",
      "#ff5c33",
      "#ff3333"
    ];


    
  };


  // Create a layer control, pass in base and overlay maps, add layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  // legend.addTo(myMap);


  //Generate a legend for the earthquake intensities



});