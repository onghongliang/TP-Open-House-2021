import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Device } from '@ionic-native/device/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  animations: [
    trigger('slidelefttitle', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
    ]),
  ]
})
export class ContactUsPage {

  public tests = new Array(20);
  constructor(
    private emailComposer: EmailComposer, 
    private appLauncher: AppLauncher,
    private appAvailability: AppAvailability, 
    private platform: Platform, 
    private device: Device,
    private iab: InAppBrowser, 
    private photoViewer: PhotoViewer,) { }

  options: InAppBrowserOptions = {
    location: 'yes',
    hidden: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    cleardata: 'yes', // iOS only
    zoom: 'no', // Android only
    hardwareback: 'yes', // Android only, navigate backwards through the InAppBrowser's history
    mediaPlaybackRequiresUserAction: 'yes',
    lefttoright: 'yes', // navigation buttons go to the left and close button to the right
    shouldPauseOnSuspend: 'yes', // Android only, make InAppBrowser WebView to pause/resume with the app to stop background audio
    hideurlbar: 'yes', // Android only, hide the url bar on the location toolbar
    // toolbar: 'yes', // iOS only
    toolbarcolor: 'white',
    navigationbuttoncolor: 'red',
    // footer: 'yes', // Android only
    footercolor: 'white', // Android only
    hidenavigationbuttons: 'yes',
    closebuttoncolor: 'red',
    // closebuttoncaption: 'Close',
  }
  
  openWithInAppBrowser(url: string) {
    this.platform.ready().then(() => {
      // this.iab.create('https://www.tp.edu.sg/', "_blank", this.options);
      this.iab.create(url, "_system", this.options);
      console.log('VR fired');
    }), er => {
      console.log(er)
    }
  }

  openTP() {
    this.openWithInAppBrowser('https://www.tp.edu.sg/')
  }

  openEmail() {
    this.emailComposer.open({
      to: 'enquiry@tp.edu.sg'
    })
  }

  openEmail1() {
    this.emailComposer.open({
      to: 'aschotline@tp.edu.sg'
    })
  }

  openEmail2() {
    this.emailComposer.open({
      to: 'bushotline@tp.edu.sg'
    })
  }

  openEmail3() {
    this.emailComposer.open({
      to: 'deshotline@tp.edu.sg'
    })
  }

  openEmail4() {
    this.emailComposer.open({
      to: 'enghotline@tp.edu.sg'
    })
  }

  openEmail5() {
    this.emailComposer.open({
      to: 'hsshotline@tp.edu.sg'
    })
  }

  openEmail6() {
    this.emailComposer.open({
      to: 'iit@tp.edu.sg'
    })
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    username = "temasekpoly";
    let urlSuccess = appUrl + username;
    let urlError = httpUrl + username;

    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      this.iab.create(urlError, "_blank", this.options);
      return;
    }
  
    this.appAvailability.check(app).then(
      () => { // success callback
        this.iab.create(urlSuccess, "_system");
      },
      () => { // error callback
        this.iab.create(urlError, "_system");
      }
    );
  }
  
  openInstagram() {
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', 'temasekpoly');
  }
  
  openTwitter() {
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', 'temasekpoly');
  }

  openMap() {
    this.photoViewer.show('https://firebasestorage.googleapis.com/v0/b/tp-open-house-2021.appspot.com/o/campus_map.jpg?alt=media&token=79f8e86c-dfc9-43ef-b0ad-c7218b82fc68', "TP Campus Map (with block numbers)");
  }
}



//service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }