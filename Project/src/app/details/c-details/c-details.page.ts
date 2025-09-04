import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { ToastService } from 'src/app/services/toast-alert/toast.service';



@Component({
  selector: 'app-c-details',
  templateUrl: './c-details.page.html',
  styleUrls: ['./c-details.page.scss'],
})
export class CDetailsPage implements OnInit {

  icon: any;

  info: any = []
  userInfo: any = []

  cs: string;
  key: string;
  code: string;

  saved: any

  temp = false;
  constructor(
    private route: ActivatedRoute,
    private iab: InAppBrowser,
    public platform: Platform,
    public router: Router,
    private photoViewer: PhotoViewer,
    private favorite: FavoriteService,
    private toast: ToastService,
    private changeRef: ChangeDetectorRef
  ) {
    this.cs = this.route.snapshot.paramMap.get('key')
  }
  async ngOnInit() {
    const fire = firebase.database().ref('Courses/' + this.cs).once('value');
    await fire.then(s => {
      console.log(s.val())
      this.info = s.val()
      this.key = s.key
      this.code = this.info.code
      this.favStatus()
      this.changeRef.detectChanges()
    })
  }


  openWithInAppBrowser(link) {
    this.platform.ready().then(() => {
      this.iab.create(link, '_blank', this.options)
    })
  }

  async favStatus() {
    await this.favorite.getFavorites().then(e => {
      const saved = e
      if (saved) {
        const chk = saved.find(x => x == this.key)
        if (chk) {
          this.saved = true;
        } else {
          this.saved = false
        }
      } else {
        this.saved = false
      }
    })
  }

  removeFav() {
    this.temp = true
    this.favorite.removeFav(this.key).then(e => {
      setTimeout(() => {
        this.temp = false
        this.favStatus()
      }, 500);
    })
  }

  addFav() {
    this.temp = true
    this.favorite.addFavorite(this.key).then((s) => {
      setTimeout(() => {
        this.temp = false
        this.favStatus()
      }, 500);
    })
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
  view(img) {
    this.photoViewer.show(img);
    console.log(img)
  }


}

