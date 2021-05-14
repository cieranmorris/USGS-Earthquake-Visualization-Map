# USGS Earthquake Visualization Map

## Background Information

The United States Geological Survey is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. One of the main goals of the USGS is to visualize relevant data will allow them to better educate the public and other government organizations, as well as secure appropriate funding for future research endeavors.

For this project, current earthquake data from the USGS was converted to a geoJSON format and visualized on an external server for interpretation. Specific programming languages used in this analysis included JavaScript with both Mapbox and Leaflet extensions, HTML, and CSS. 

### Data Sourcing

The data analyzed in this project was derived from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), which provides earthquake data in a number of different formats and is updated every 5 minutes. The JSON selected for this visualization was 'All Earthquakes from the Past 7 Days' and was selected on May 13th, 2021.

### Data Import and Visualization

Using Leaflet and MapBox in the JavaScript code, all earthquakes from the JSON were converted to a geoJSON and plotted on the map based on their latitude and longitude coordinates.

* All earthquakes are represented by a semi-transparent circle, which is sized based on the magnitude of the earthquake and color coded based on the depth of the earthquake. Specifically, earthquakes with higher magnitudes display a larger radius and earthquakes with greater depth display a deeper shade of red. The depth of the earthquake is represented as the third coordinate in the geoJSON data.

* When clicking on any earthquake radius across the map, a popup appears providing additional information about the earthquake including relative location, date and time it occurred, and the magnitude.

* A color coded legend located in the bottom right corner of the broswer provides context for the depth of all earthquakes plotted on the map.

* A layer control center is located in the upper righthand corner of the screen that allows the user to switch between base maps that visualize this data in light map, dark map, and satellite map views.

### Seismic Activity in Relation to Tectonic Plates

To take this analysis further, the tectonic plates of the earth were integrated into the dataset in order to illustrate the relationship between tectonic plates and seismic activity. This second dataset on tectonic plates was pulled from [this Github link](https://github.com/fraxen/tectonicplates), and integrated into the same JavaScript code for the earthquake visualizations.

* An added element to the layer control center allows the user to toggle independently between the earthquake data and the tectonic plate data in order to visualize their relative locations and potential effects on size and magnitude of all reported earthquakes around the world.

### Final Analysis

- - -

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
