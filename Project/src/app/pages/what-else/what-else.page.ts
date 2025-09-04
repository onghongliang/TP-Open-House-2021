import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-what-else',
  templateUrl: './what-else.page.html',
  styleUrls: ['./what-else.page.scss'],
})
export class WhatElsePage implements OnInit {

  constructor(public platform: Platform,
    private iab: InAppBrowser,
    private appRate: AppRate,
    private toast : ToastService
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

  openAbout() {
    this.platform.ready().then(() => {
      this.iab.create('https://www.tp.edu.sg/about-tp/corporate-profile.html', "_blank", this.options);
      console.log('About')
    }), er => {
      console.log(er)
    }
  }

  openFacilities() {
    this.platform.ready().then(() => {
      this.iab.create('https://www.tp.edu.sg/about-tp/our-campus-map-facilities.html', "_blank", this.options);
      console.log('Facilities')
    }), er => {
      console.log(er)
    }
  }
  showRatePrompt() {
    this.appRate.preferences = {
      displayAppName: 'TPOH 2021',
      promptAgainForEachNewVersion: false,
      inAppReview: true,
      simpleMode: true,
      storeAppURL: {
        ios: '1543665813',
        android: 'market://details?id=io.ionic.TPOH2021'
      },
      customLocale: {
        title: 'Are you enjoying our app?',
        message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks for your support!',
        cancelButtonLabel: 'No, Thanks',
        laterButtonLabel: 'Remind Me Later',
        rateButtonLabel: 'Rate It Now'
      },
      callbacks: {
        onRateDialogShow: function (callback) {
          callback(1) // cause immediate click on 'Rate Now' button }
        },
        onButtonClicked: function (buttonIndex) {
          console.log("onButtonClicked -> " + buttonIndex);
        }
      },
    }
    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=io.ionic.TPOH2021',
      ios: '1543665813'
    }
    this.appRate.promptForRating(true);
  }
}
