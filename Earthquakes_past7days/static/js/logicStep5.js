// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
	let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
	});

	// We create the dark view tile layer that will be an option for our map.
	let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			accessToken: API_KEY
		});
	
	// Create the map object with center, zoom level and default layer.
	let map = L.map('mapid', {
		center: [39.5, -98.5],
		zoom: 3,
		layers: [streets]
	});
	

		// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

let overlays = {
	Earthquakes: earthquakes
  };

// Pass our map layers into our layers control and add the layers control to the map.
// Then we add a control to the map that will allow the user to change
L.control.layers(baseMaps, overlays).addTo(map);

// Create a legend control object.
let legend = L.control({
	position: "bottomright"
  });


// Then add all the details for the legend.
legend.onAdd = function() {
	let div = L.DomUtil.create("div", "info legend");
	
	const magnitudes = [0, 1, 2, 3, 4, 5];
	const colors = [
	  "#98ee00",
	  "#d4ee00",
	  "#eecc00",
	  "#ee9c00",
	  "#ea822c",
	  "#ea2c2c"
	];
	// Looping through our intervals to generate a label with a colored square for each interval.
	for (var i = 0; i < magnitudes.length; i++) {
		console.log(colors[i]);
		div.innerHTML +=
		//background means background color of box
		" <i style='background:" + colors[i] + "'></i> " +
		magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
	}
	return div;
};
	legend.addTo(map);





// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
	return {
	  opacity: 1,
	  fillOpacity: 1,
	  fillColor: getColor(feature.properties.mag),
	  color: "#000000",
	  radius: getRadius(feature.properties.mag),
	  stroke: true,
	  weight: 0.5
	};
  }
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
	if (magnitude > 5) {
	  return "#ea2c2c";
	}
	if (magnitude > 4) {
	  return "#ea822c";
	}
	if (magnitude > 3) {
	  return "#ee9c00";
	}
	if (magnitude > 2) {
	  return "#eecc00";
	}
	if (magnitude > 1) {
	  return "#d4ee00";
	}
	return "#98ee00";
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
	if (magnitude === 0) {
	  return 1;
	}
	return magnitude * 4;
  }



// Retrieve the earthquake link GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
 
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(earthquakes);

// Add earthquakes layer to our map
earthquakes.addTo(map);

});















// -------------------------------------------------

// // Coordinates for each point to be used in the line.
// // Coordinates for each point to be used in the polyline.
// let line = [
// 	[33.9416, -118.4085],
// 	[37.6213, -122.3790],
// 	[40.7899, -111.9791],
// 	[47.4502, -122.3088]
//   ];

//   // Create a polyline using the line coordinates and make the line red.
//   L.polyline(line, {
// 	color: "yellow"
//  }).addTo(map);

// Get data from cities.js
// let cityData = cities;


// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
// 	console.log(city)
// 	//L.marker(city.location)
// 	L.circleMarker(city.location, {
// 		radius: (city.population-200000)/100000,
// 		color: "yellow",
// 		fillColor: '#ffffa1',
// 		weight: 4
// 	})

// 	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });

// Alternative way to Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
	//	let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add circle to the map
// L.circle([34.0522, -118.2437], {
// 	radius: 100
//  }).addTo(map);

// Circle Marker
	// 	 L.circleMarker([34.0522, -118.2437]).addTo(map);

// Add circle marker with rad, color and fill color to the map
// 	L.circleMarker([34.0522, -118.2437], {
// 	radius: 100,
// 	color: "black",
// 	fillColor: '#ffffa1'
// }).addTo(map);

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// point to layer function for markers and massing through values
// feature is type and Latling is Latitude and longitude
				// Grabbing our GeoJSON data - pointToLayer method - code works below
	// 				// L.geoJson(sanFranAirport, {
	// 				// 	// We turn each feature into a marker on the map.
	// 				// 	pointToLayer: function(feature, latlng) {
	// 				// 	console.log(feature);
	// 				// 	return L.marker(latlng)
	// 				// 	.bindPopup("<h2>" + feature.properties.name + "</h2>  <hr> <h3>" + feature.properties.city + "," + feature.properties.country  + "</h3>");
	// 				// 	}
	// 				// }).addTo(map);


	// // For Each Method
	// L.geoJSON(sanFranAirport, {
	// 	onEachFeature: function(feature, layer){
	// 		console.log(layer);
	// 		layer.bindPopup("<h2>" + feature.properties.name + "</h2>  <hr> <h3>" + feature.properties.city + "," + feature.properties.country  + "</h3>");
	// 	}
	// }).addTo(map);
