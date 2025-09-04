import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavParams, Platform } from '@ionic/angular';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastService } from 'src/app/services/toast-alert/toast.service';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.page.html',
  styleUrls: ['./schedule-modal.page.scss'],
})
export class ScheduleModalPage implements OnInit {

  onData: any;
  securedYtLink : any;
  constructor(
    private navParams: NavParams,
    private sanitizer: DomSanitizer,
    private iab: InAppBrowser,
    public platform: Platform,
    private clipboard: Clipboard,
    private toast: ToastService,
    private IAB: InAppBrowser,
    ) {
    
    
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

  ngOnInit() {
    var data = null;
    data = this.navParams.data
    if (data.watch.youtube && !data.watch.youtube.changingThisBreaksApplicationSecurity) {
      data.watch.youtube = this.sanitizer.bypassSecurityTrustResourceUrl(data.watch.youtube)
    }
    this.onData = data
    console.log(this.onData.watch.youtube.changingThisBreaksApplicationSecurity)
  }

  ionViewDidLeave() {
    // this.onData = null
  }
  openTeams(link) {
    this.platform.ready().then(() => {
      this.iab.create(link, "_system").show()
    }).catch(er => {
      console.log(er)
    })
  }
  openLive(ytlink){
    // this.securedYtLink  = ytlink.changingThisBreaksApplicationSecurity
    this.platform.ready().then(() => {
      this.iab.create(ytlink, '_system', this.options)
    })

  }

  copy(link) {
    this.clipboard.copy(link).then((s) => {
      console.log(s)
      let msg = "Link Copied!"
      this.toast.presentToast(msg)
    }).catch(er => {

    })

  }

  openIAB() {
    this.platform.ready().then(() => {
      this.IAB.create('https://www.tp.edu.sg/joinoursquad/voh-events.html', "_blank", this.options);
    }), er => {
      console.log(er)
    }
  }
}
