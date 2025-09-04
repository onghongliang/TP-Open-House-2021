import { Component, AfterContentInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { NotificationService, Notif } from 'src/app/services/notification/notification.service';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { ToastService } from 'src/app/services/toast-alert/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements AfterContentInit {

  backButtonSubscription;

  public caroRef: firebase.database.Reference;
  public caro: Array<any>;
  data: any;
  sub: any;
  guest = false;
  user: any;
  noti: any;

  slideOptsOne = {  // OPTIONS FOR CAROUSEL
    slidesPerView: 1.3,
    centeredSlides: false,
    centeredSlidesBounds: false,
    watchSlidesProgress: true,

  }
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private datepipe: DatePipe,
    private navCtrl: NavController,
    public storage: Storage,
    private iab: InAppBrowser,
    private photoViewer: PhotoViewer,
    private router: Router,
    private fireAuth: AngularFireModule,
    private alertController: AlertController,
    private scheService: NotificationService,
    private oneSignal: OneSignal,
    private toast: ToastService,
    private changeRef: ChangeDetectorRef

  ) {

  }
  async ngAfterContentInit() {
    firebase.auth().onAuthStateChanged(e => {
      if (e) {
        this.user = e.uid
      }
    })
    await this.storage.get('guest').then(e => {
      if (e) {
        this.guest = true
      } else {
        this.guest = false
      }
      this.changeRef.detectChanges();
    })
    this.loadCaro()
  }

  loadCaro() {
    this.sub = this.platform.resume.subscribe(async () => {
      console.log('Resume event detected');
    })

    this.caroRef = firebase.database().ref('highlight');
    this.caroRef.on('value', resp => {

      let highlight = [];

      resp.forEach(course => {
        let item = course.val();
        item.key = course.key;
        highlight.push(item);

      });
      this.data = true;
      this.caro = highlight;
      this.changeRef.detectChanges() // put after global variables, etc, this.data & this.caro.
    });

  }


  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    // clearcache: 'yes',
    // clearsessioncache: 'yes',
    // cleardata: 'yes', // iOS only
    zoom: 'no', // Android only
    hardwareback: 'yes', // Android only, navigate backwards through the InAppBrowser's history
    mediaPlaybackRequiresUserAction: 'yes',
    lefttoright: 'yes', // navigation buttons go to the left and close button to the right
    shouldPauseOnSuspend: 'yes', // Android only, make InAppBrowser WebView to pause/resume with the app to stop background audio
    hideurlbar: 'yes', // Android only, hide the url bar on the location toolbar
    // toolbar: 'yes', // iOS only
    toolbarcolor: 'white',
    navigationbuttoncolor: 'red',
    footercolor: 'white', // Android only
    hidenavigationbuttons: 'yes',
    closebuttoncolor: 'red',
    toolbarposition: 'bottom',
    allowInlineMediaPlayback: 'yes',
    enableViewportScale: 'yes',
    // disallowoverscroll: 'yes'
    // closebuttoncaption: 'Close',
  }

  launch(card) {

    if (card.mode == 'link') {
      this.platform.ready().then(() => {
        let l = "https://www.tp.edu.sg/vrtour/"
        this.iab.create(card.link, '_blank', this.options)
      })
    } else {
      this.router.navigate([card.link])
    }
  }

  goToProfilePage() {
    if (firebase.auth().currentUser == null) {
      this.alertControllerPopup("No access to profile page", "Please sign in.");
    }
    else {
      this.router.navigate(['profile']);
    }

  }

  goToNotificationPage() {
    this.router.navigate(['notification']);
  }

  goToHuntNWin() {
    if (firebase.auth().currentUser == null) {
      this.alertControllerPopup("No access to Hunt-n-win", "Please sign in to play.");
    }
    else {
      this.router.navigate(['/hunt-n-win']);
    }
  }

  async alertControllerPopup(msg1, msg2) {
    await this.alertController.create({
      header: msg1,
      message: msg2,
      buttons: [
        {
          text: "Sign in", handler: (res) => {
            this.router.navigate(['/intro-page']);
          }
        },
        {
          text: "Cancel"
        }
      ]
    }).then(res => res.present());
  }


  ionViewDidEnter() {
    this.updateStuff();
    this.checkStatus();
  }

  setupPage() {
    this.navCtrl.navigateRoot('intro-page')
  }


  ionViewWillEnter() {
    if (this.platform.is('android')) {
      this.backButtonSubscription = this.platform.backButton.subscribe(() => {
        this.leaveAlert();
      });
    }

    this.updateStuff();
    this.checkStatus();
  }



  ionViewWillLeave() {
    if (this.platform.is('android')) {
      this.backButtonSubscription.unsubscribe();
    }

    this.updateStuff();
    this.checkStatus();
  }


  updateStuff() {
    this.noti = undefined;
    this.scheService.updateStuff().then(val => {
      this.noti = val;
    });

  }

  checkStatus() {
    //Set depending tags depending on firebase authentication
    if (firebase.auth().currentUser == null) {
      this.oneSignal.deleteTag('login');
      this.oneSignal.sendTag('guest', 'guest');
    }
    else {
      this.oneSignal.sendTag('login', 'login');
      this.oneSignal.deleteTag('guest');
    }
  }

  gameAlert() {
    let header = 'Coming Soon';
    let msg = 'The game will be coming soon end december!'
    this.toast.presentAlert(header, msg)
  }

  async leaveAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Exit',
      message: 'Are you sure you want to close application?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

}
