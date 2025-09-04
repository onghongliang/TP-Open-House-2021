import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  res: any;

  styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "color": "#577593"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fb0000"
        },
        {
          "saturation": -35
        },
        {
          "lightness": 60
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]

  

  constructor() {  }
  getEngine() {
    var engineering = new google.maps.Data();
    engineering.setStyle({
      fillColor: '#7f32a8',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });
    engineering.loadGeoJson('https://next.json-generator.com/api/json/get/Ny8f23QZK')
    return engineering;
  }

  getDesign() {
    var design = new google.maps.Data();
    design.setStyle({
      fillColor: '#32a89e',
      strokeOpacity: 0,
      fillOpacity: 1,
      strokeWeight: 1,
      // zIndex: 7 
    });
    design.loadGeoJson('https://next.json-generator.com/api/json/get/NkwAyaXWt')
    return design;
  }


  getIIT() {
    var iit = new google.maps.Data();
    iit.setStyle({
      fillColor: '#4169e1',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
    });
    iit.loadGeoJson('https://next.json-generator.com/api/json/get/4JHuUa7Zt')
    return iit;
  }
  getScience() {
    var science = new google.maps.Data();
    science.setStyle({
      fillColor: '#00d928',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });
    science.loadGeoJson('https://next.json-generator.com/api/json/get/Ek9t7p7bt')
    return science;
  }

  getHSS() {
    var hss = new google.maps.Data();
    hss.setStyle({
      fillColor: '#ff8400',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });
    hss.loadGeoJson('https://next.json-generator.com/api/json/get/VJ8HRt3bF')
    return hss;
  }

  getBus() {
    var bus = new google.maps.Data();
    bus.setStyle({
      fillColor: '#ffff17',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });
    bus.loadGeoJson('https://next.json-generator.com/api/json/get/EyDabTmbY')
    return bus;
  }

  getTP() {
    var tp = new google.maps.Data();
    tp.setStyle({
      fillColor: '#9a0007',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });
    tp.loadGeoJson('https://next.json-generator.com/api/json/get/EklNm6gMK')  
    return tp;
  }
  getHole() {
    var tp = new google.maps.Data();
    tp.setStyle({
      fillColor: '#b9d3c2',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1,
      zIndex: 7 
    });
    tp.loadGeoJson('https://next.json-generator.com/api/json/get/Nk23D6gMF')  
    return tp;
  }


}
