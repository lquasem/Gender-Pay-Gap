// // // create empty list 
let earnings = [];
let circles = [];


d3.json("/globalData", function (data) {
  // console.log(data)
  createMap(data.features);
});

function createMap(data) {

  // console.log(data);

  // Define variables for greayscale tile layers
  // var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.light",
  //   accessToken: API_KEY
  // });
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token={accessToken}", {
    accessToken: API_KEY
  });

  // Define variables for satellite tile layers
  // var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  //   maxZoom: 18,
  //   id: "mapbox.satellite",
  //   accessToken: API_KEY
  // });

  var satellite = darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token={accessToken}", {
    accessToken: API_KEY
  });


  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Satellite: satellite
  };
  var earnings = new L.LayerGroup();
  // // Create overlay object to hold overlay layer
  var overlayMaps = {
    Earnings: earnings
  };
  //create map object and set default layers
  var myMap = L.map("map", {
    // center: [51.1, 10.45],
    center:[35.326912, -40.948532],
    zoom: 3,
    layers: [satellite, light]
  });

  // //Add the layer control to the map
  // L.control.layers(baseMaps).addTo(myMap);
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);



  // Use this method to find radius, pass your current earthquake object
  function getCircleSize(earning) {
    // console.log(earning);
    var circleSize = earning.properties.year_2016_earnings * 80
    // console.log(circleSize)
    return circleSize;
  }

  function getCircleColor(earning) {
    var color = "";

    if (earning.properties.sex === "Female (Sex)") {
      color = "pink";
    }
    else {
      color = "blue";
    }
    return color;
  }

  function getLocation(earning) {
    var obj = [earning.geometry.coordinates[1], earning.geometry.coordinates[0]];
    return obj;
  }
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < data.length; i++) {
    L.circle(getLocation(data[i]), {
        fillOpacity: 0.8,
        color: "black",
        weight: 0.5,
        fillColor: getCircleColor(data[i]),
        radius: getCircleSize(data[i])
      // }).addTo(earnings)
    }).bindPopup(`<h3>${data[i].properties.country}</h3><hr><p>${(data[i].properties.sex)}</h3><hr><p>${(data[i].properties.year_2016_earnings)} </p>`).addTo(earnings)
}
//Show earthquakes by default
earnings.addTo(myMap);




}