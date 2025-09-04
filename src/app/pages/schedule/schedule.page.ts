import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonItemSliding, NavController, ToastController, LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage'
import * as firebase from 'firebase';
import { ScheduleModalPage } from './schedule-modal/schedule-modal.page';
import { FilterSchedulePage } from './filter-schedule/filter-schedule.page';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SchedulePage implements OnInit {

  segment = "Day 1";

  data: any;
  time: any;
  currentdate: any;
  noti: any;

  saved = [];

  public coursesList = [];
  public coursesSch: Array<any>;
  public loadedcoursesList: Array<any>;
  public countryRef: firebase.database.Reference;
  date: any;
  sch: any;
  setValue: any;
  setSch: any;
  loader: any;

  cate = "All"
  department = "All"

  @ViewChild('ionslide', { static: true }) itemSliding: IonItemSliding;

  constructor(public navCtrl: NavController,
    private datePipe: DatePipe,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private scheService: ScheduleService,
    public storage: Storage,
    public platform: Platform,
    private iab: InAppBrowser,
    
    public alertController: AlertController,
    private modalController: ModalController,
    private toast: ToastService,
    private changeRef: ChangeDetectorRef,
    
  ) { }

  ngOnInit() {
    this.sch = 'All'  // default start
    this.getData(this.segment)

  }

  updateSaved() { // update numeber of saved item
    this.saved = []
    this.scheService.getAllSchedule().then(s => {
      const allSche = s
      this.scheService.getSchedule().then(d => {
        const savedItem = d
        if (savedItem) {
          savedItem.map(item => {
            const chk = allSche.find(x => x.id == item)
            if (chk) {
              this.saved.push(chk.id)
              console.log(this.saved.length)
            }
          })
        }
        this.changeRef.detectChanges()
      })
    })
  }


  ionViewWillEnter() {
    this.updateSaved()
  }

  async getData(day) {
    this.toast.presentLoading(null)
    const schedule = firebase.database().ref('schedule').child(day)
    await schedule.once('value', data => {
      this.toast.stopLoading()
      var date = new Date();
      this.currentdate = this.datePipe.transform(date, "yyMMddHHmm")
      var eventdate = + this.currentdate;
      this.data = true;
      const schedule = data.val()
      const scheArr = schedule.map(v => {
        if (this.currentdate > v.date) {
          v.pass = true
          return v
        }
        return v
      })
      this.checkFilter(scheArr)
    }).catch(e => {
      this.toast.errorToast(null)
    })
  }

  async checkFilter(scheArr) {
    this.coursesList = []
    var filterArr = scheArr
    // department
    if (this.department !== "All") {
      filterArr = filterArr.filter(e => {
        if (e.category.find(d => d == this.department)) {
          return e
        }
      })
    }
    // cate
    if (this.cate !== "All") {
      filterArr = filterArr.filter(e => {
        if (e.category.find(d => d == this.cate)) {
          return e
        }
      })
    }
    this.coursesList = filterArr
    this.changeRef.detectChanges();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No schedule available. :(',
      duration: 2000
    });
    toast.present();
  }

  addSche(slidingItem: IonItemSliding, sche) {
    this.scheService.addSchedule(sche.id).then(e => {
      this.updateSaved()
      
      slidingItem.close()
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

  openLink(link) {
    if (link == null) {
      console.log("link = " + link)
      return false
    } else {
      this.platform.ready().then(() => {
        this.iab.create(link, "_blank", this.options);
        console.log(link + " is working!")
      }), er => {
        console.log(er)
      }
    }
  }
  // NEW

  async viewModal(details) {
    const modal = await this.modalController.create({
      component: ScheduleModalPage,
      cssClass: 'schedule-modal',
      componentProps: details
    });


    return await modal.present();
  }

  async segmentChanged(event) {

    this.getData(this.segment)
    console.log(this.segment);
    // await this.slider.slideTo(this.segment)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterSchedulePage,
      cssClass: 'filter-schedule',
      componentProps: { category: this.cate, department: this.department }
    });

    modal.onDidDismiss()
      .then((data) => {
        const onReturn = data['data'];
        console.log(onReturn)
        this.department = onReturn.department
        this.cate = onReturn.category
        this.getData(this.segment)
      })
    return await modal.present();
  }

  removeDep() {
    this.department = "All"
    this.getData(this.segment)
  }
  removeCat() {
    this.cate = "All"
    this.getData(this.segment)
  }

}
