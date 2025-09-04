import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, AlertController, ToastController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';


@Component({
  selector: 'app-makan-time',
  templateUrl: './makan-time.page.html',
  styleUrls: ['./makan-time.page.scss'],
})
export class MakanTimePage implements OnInit {

  data: any;


  @ViewChild(IonContent, { static: true }) content: IonContent;
  public foodList: Array<any>;
  // public loadedcoursesList: Array<any>;
  public countryRef: any;
  foodCat: string;
  constructor(public navCtrl: NavController, 
    public alertController: AlertController,
    private changeRef: ChangeDetectorRef,
    private statusBar: StatusBar,
    public toastController: ToastController) {
  }


  ngOnInit() {
    this.foodCat = 'All'
    this.countryRef = firebase.database().ref('food-outlet');  // Default All
    this.countryRef.on('value', resp => {
      let food = [];
      this.data = true;
      resp.forEach(course => {
        let item = course.val();
        item.key = course.key;
        food.push(item);
      });
      this.foodList = food;
      this.changeRef.detectChanges();
    });

  }
  ScrollToTop() {
    this.content.scrollToTop(750);
  }

  logScrollStart() {
    console.log("logScrollStart : When Scroll Starts");
  }

  logScrolling() {
    console.log("logScrolling : When Scrolling");
  }

  logScrollEnd() {
    console.log("logScrollEnd : When Scroll Ends");
  }
  async presentAlertRadio() {
    this.statusBar.backgroundColorByHexString('#AD0000');
    this.statusBar.styleLightContent();
    const alert = await this.alertController.create({
      header: 'Category',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'All',
          value: 'All',
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'F&B Outlets',
          value: 'F&B Outlet',
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Food Courts',
          value: 'Food Court'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Cafés',
          value: 'Café'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Restaurants',
          value: 'Restaurant'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.statusBar.backgroundColorByHexString('#9a0007');
            this.statusBar.styleLightContent();
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data  => {
            this.foodCat = null
            this.statusBar.backgroundColorByHexString('#9a0007');
            this.statusBar.styleLightContent();
            setTimeout(() => {
              this.foodCat = data
           
              console.log(this.foodCat);
              this.filterFd();
            },500)
          }
        }
      ]
    });
    await alert.present();
  }
  filterFd() {

    if (this.foodCat == 'All') {
      this.ngOnInit()
      console.log('fire')
    }
    else if (this.foodCat == '11 Jan (Sat)') {
      this.countryRef = firebase.database().ref('food-outlet').orderByChild('sat').startAt(0);;  // Default All
      this.countryRef.on('value', resp => {
        let food = [];
        this.data = true;
        resp.forEach(course => {
          let item = course.val();
          item.key = course.key;
          food.push(item);
        });
        this.foodList = food
        this.presentSatToast(this.foodList.length)
      }); 
    }
    else if (this.foodCat == this.foodCat) {
      this.countryRef = firebase.database().ref('food-outlet').orderByChild('type').equalTo(this.foodCat);  // Default All
      this.countryRef.on('value', resp => {
        let food = [];
        this.data = true;
        resp.forEach(course => {
          let item = course.val();
          item.key = course.key;
          food.push(item);
        });
        this.foodList = food
        this.presentToast(this.foodList.length, this.foodCat)
      }); 
    }
    
    console.log(this.foodList)
  }
  async presentToast(msg, type) {
    const toast = await this.toastController.create({
      message: 'We have ' + msg + ' ' + type + 's' + '!' ,
      color: 'tertiary',
      duration: 2000
    });
    toast.present();
  }
  
  async presentSatToast(msg) {
    const toast = await this.toastController.create({
      message: msg + ' food outlets are open on 11 Jan (Sat)!' ,
      color: 'tertiary',
      duration: 2000
    });
    toast.present();
  }

}
