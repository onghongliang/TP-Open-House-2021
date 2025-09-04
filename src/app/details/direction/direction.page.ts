import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';


declare var google;

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements AfterViewInit {

  map: any;
  loading:any;
  mode: string;
  @ViewChild('mapElement', { static: true }) mapElement;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  currentLocation: any = { lat: 0, lng: 0 };
  timeout: any;

  try: string;

  constructor(
    private geolocation: Geolocation,
    public actionSheetController: ActionSheetController,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private alert: AlertController,
    public loadingController: LoadingController
  ) {

    
   }


  ngAfterViewInit() {
    this.renderMap() // render map
     
    this.load() // set direction

  }
  ionViewWillEnter() {

  }

  renderMap() {
    let loc = { lat: 1.3450015, lng: 103.931107 }

    let mapOpt = {
      zoom: 7,
      center: loc,
      zoomControl: false,
      rotateControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);
  }

  load() {
    
    let msg = "Please enable location and high precision GPS for this app"
    
    this.checkGPS() // run timeout

      this.geolocation.getCurrentPosition().then((resp) => {
        clearTimeout(this.timeout) // cancel timeout if check timeout if geolocation works...
    
        this.currentLocation.lat = resp.coords.latitude;
        this.currentLocation.lng = resp.coords.longitude;
        console.log(resp)
        this.calculateAndDisplayRoute('TRANSIT')
        this.mode = 'Transit Mode'
        this.try = 'TRANSIT'


      }).catch((er) => {
        if (er.code == 1) {
  
          this.presentAlert(null, msg)
        } else {
       
          let msg = "Unexpected error occured, please try again later"
          this.presentAlert(null, msg)
        }
        console.log(er)
      });

      this.directionsDisplay.setMap(this.map);
 
    // }, 500)

  }



  // on click handle
  refreshPos() {
  
    this.checkGPS()
    this.geolocation.getCurrentPosition().then((resp) => {
      clearTimeout(this.timeout) // cancel timeout if check timeout if geolocation works...
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
      // console.log(resp)
      this.calculateAndDisplayRoute(this.try)
     
      // this.mode = 'Transit Mode'
    }).catch((er => {
      console.log(er)
     
    }));

  }

//   async present() {
//     this.loading = await this.loadingController.create({
//       cssClass: 'my-custom-class',
//       message: 'Loading directions',
//     });
//     await this.loading.present();
//   }
//   async dismissLoader() {
//     await this.loading.dismiss()
//     .then(()=>{
//       this.loading = null;
//     })
//     .catch(e => console.log(e));
// }

  calculateAndDisplayRoute(mode) {
    const tp = { "lat": 1.345486, "lng": 103.932897 }
    const that = this;


    this.directionsService.route({
      origin: this.currentLocation,
      destination: tp,
      // provideRouteAlternatives: true,
      travelMode: mode
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
        console.log(response)
      } else {
        let msg = "Please enable location to high precision"
        // this.presentAlert(status, msg)
        console.log('Directions request failed due to ' + status);
      }
    });

  }
  async presentAlert(status, msg) {  // for error msg
    var err = status ? status : "Error"
    const alert = await this.alert.create({
      header: err,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // after user click OK => back page
            this.navCtrl.pop()
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    // this.taptic.notification({ type: 'success' })
    this.statusBar.backgroundColorByHexString('#AD0000');
    const actionSheet = await this.actionSheetController.create({
      mode: 'md',
      header: 'Mode of Transport',
      buttons: [{
        text: 'Walking',
        icon: 'ios-walk',
        handler: () => {
          console.log('Share clicked');
          this.calculateAndDisplayRoute('WALKING')
          this.try = 'WALKING'
          this.mode = 'Walking Mode'
          this.statusBar.backgroundColorByHexString('#9a0007');
          // this.taptic.selection()
        }
      }, {
        text: 'Transit',
        icon: 'ios-bus',
        handler: () => {
          console.log('Play clicked');
          this.calculateAndDisplayRoute('TRANSIT')
          this.mode = 'Transit Mode'
          this.try = 'TRANSIT'
          this.statusBar.backgroundColorByHexString('#9a0007');
          // this.taptic.selection()
        }
      }, {
        text: 'Driving',
        icon: "ios-car",
        handler: () => {
          console.log('Favorite clicked');
          this.calculateAndDisplayRoute('DRIVING')
          this.mode = 'Driving Mode'
          this.try = 'DRIVING'
          this.statusBar.backgroundColorByHexString('#9a0007');
          // this.taptic.selection()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.statusBar.backgroundColorByHexString('#9a0007');
          // this.taptic.selection()
        }
      }]
    });
    await actionSheet.present();
  }

  checkGPS() {
    let msg = "Please enable location and high precision GPS for this app"
    this.timeout = setTimeout(() => {
      this.presentAlert(null, msg)
    }, 3000) // max 3 secs 
    
  }

}
