import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

declare var google;
@Injectable({
  providedIn: 'root'
})
export class GameService {

  // game n hunt map style
  game_style = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
  loc = { lat: 1.345680337221324, lng: 103.9326074266645 }

  bound = {
    north: 1.350697,
    south: 1.341382,
    west: 103.921739,
    east: 103.937388,
  }
  map_options = {
    center: this.loc,
    zoom: 16.5,
    zoomControl: false,
    rotateControl: true,
    mapTypeControl: false,
    disableDefaultUI: true,
    styles: this.game_style,
    restriction: {
      latLngBounds: this.bound,
      strictBounds: false
    },
  }

  INCOMPLETE = {
    url: 'https://www.flaticon.com/svg/static/icons/svg/2210/2210229.svg',
    scaledSize: new google.maps.Size(30, 30)
  }

  ICONS = {
    informatics: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/1006/1006363.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    business: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/1256/1256650.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    engineering: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/3079/3079162.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    design: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/3697/3697957.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    humanities: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/2640/2640788.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    science: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/1157/1157001.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    library: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/3100/3100752.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    macsub: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/2922/2922037.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    bedokres: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/3095/3095057.svg',
      scaledSize: new google.maps.Size(40, 40)
    },
    gcv: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/3209/3209251.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    foyerramp: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/492/492143.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    roundabt: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/752/752783.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    triangulargarden: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/748/748845.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
    horseshoe: {
      url: 'https://www.flaticon.com/svg/static/icons/svg/1055/1055826.svg',
      scaledSize: new google.maps.Size(30, 30)
    },
  }


  constructor() { }


  checkCharacter(index) { // return user's character
    if (index) {
      return `assets/characters/${index}.svg`
    }
    return `assets/characters/0.svg`
  }

  getSchoolContent() {
    return firebase.database().ref('content_venue').once('value');
  }

}


