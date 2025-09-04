import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MapService } from 'src/app/services/map/map.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {

  @ViewChild('mapElement', { static: false }) mapElement;
  map: any;
 

  myLocation:any; 

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private mapSer: MapService,
    private status: StatusBar,
  ) {

  }

  ngAfterViewInit() {
    const loc= { lat: 1.345680337221324, lng: 103.9326074266645 }
    this.zoom(loc, null) // render map

    this.findMe() // your location

   
    this.mapSer.getEngine().setMap(this.map) // load all polygon shapes
    this.mapSer.getDesign().setMap(this.map)
    this.mapSer.getBus().setMap(this.map)
    this.mapSer.getScience().setMap(this.map)
    this.mapSer.getIIT().setMap(this.map)
    this.mapSer.getHSS().setMap(this.map)
    this.mapSer.getTP().setMap(this.map)
    this.mapSer.getHole().setMap(this.map)
  }

  findMe() {
    var engineering = new google.maps.Data();
    engineering.setStyle({
      fillColor: '#7f32a8',
      strokeOpacity: 0,
      strokeWeight: 1,
      fillOpacity: 1
      // zIndex: 7 
    });

    const icon = {
      url: "../../../assets/icon/location-marker.png", // image url
      scaledSize: new google.maps.Size(55, 50), // scaled size
    };

    let options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: Infinity
    };
    var loc = new google.maps.Marker({
      icon: icon,
      scaleSize : new google.maps.Size(50, 50),
    });
 
    let content = "<h5>Your Current Location</h5>";
    this.addInfoWindow(loc, content);


    this.geolocation.watchPosition(options).subscribe((position) => {
      console.log(position.coords)
      let x = position.coords.longitude;
      let y = position.coords.latitude;


      this.myLocation = new google.maps.LatLng(y, x);

      loc.setPosition(this.myLocation);  // update pos
      loc.setMap(this.map)  // update pos on map

      this.map.data.loadGeoJson('')

    }, (err) => {
      console.log(err);

    });
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  zoom(loc,zoom) {
    var zm = zoom ? zoom : 16.5;

    let mapOptions = {
      center: loc,
      zoom: zm,
      zoomControl: false,
      rotateControl: true,
      mapTypeControl: false,
      disableDefaultUI: true,
      styles: this.mapSer.styles
    }
    // render the map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  



  ionViewWillEnter() {
    this.status.backgroundColorByHexString('#9a0007')
  }
  ionViewWillLeave() {
    this.status.backgroundColorByHexString('#9a0007')
  }
}
