import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-poly-webinar',
  templateUrl: './poly-webinar.page.html',
  styleUrls: ['./poly-webinar.page.scss'],
})
export class PolyWebinarPage implements OnInit {

  constructor(
    private IAB: InAppBrowser,
    private platform : Platform,
  ) { }

  ngOnInit() {
  }

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

  openIAB(){
    this.platform.ready().then(() => {
      this.IAB.create('https://www.tp.edu.sg/polyedguide/form.html', "_blank", this.options);
    }), er => {
      console.log(er)
    }
  }
}
