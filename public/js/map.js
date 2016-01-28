"use strict";
var map;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
  console.log('Initializing...');
  initializeMap();
  getNearbyMeters()
  .then(drawNearbyMeters);
}

function getNearbyMeters(){
  return request('get', '/api/meters')
  .end()
  .then( res => {
    meters = response;
  })
  .catch( (err) => {
    console.error('Error getting meters');
    console.error(err);
  });
}

function drawNearbyMeters(){
  var infowindow = new google.maps.InfoWindow();
  for (let i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: 'orange',
        strokeColor: 'orange',
        strokeWeight: 1,
        fillOpacity: 0.8
      }
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  } 
}

function initializeMap(){

  var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
  {name: "Styled Map"});

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(34.024212, -118.496475),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

}

