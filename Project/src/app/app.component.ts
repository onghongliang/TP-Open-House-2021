import { Component, NgZone } from '@angular/core';

import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { NotificationService, Notif } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  noti: any;
  notif: Notif[] = []
  newNotif: Notif = <Notif>{}


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    public alertController: AlertController,
    private ntfService: NotificationService,
    private router: Router,
    private oneSignal: OneSignal,
    private toast: ToastController,
    private zone: NgZone,
    private appRate: AppRate
  ) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#9a0007');
      this.auth.checkAuth()
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.setupPush();
        this.showRatePrompt();
      }
    });
  }


  setupPush() {

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.startInit('37c5ee3d-7144-4239-91cf-253ac0f4f6b8', '23723001013'); //android

    //When notification is opened by the user
    this.oneSignal.handleNotificationOpened().subscribe(data => {

      let msg = data.notification.payload.body;
      let title = data.notification.payload.title;
      let id = data.notification.payload.notificationID;
      let date = Date();
      //alert("handle_noti_opened");
      this.showAlert(title, msg, id, date);

    });


    //Notification when received
    this.oneSignal.handleNotificationReceived().subscribe(data => {

      let msg = data.payload.body;
      let title = data.payload.title;
      let id = data.payload.notificationID;
      let date = Date();
      //alert("handle_noti_received")
      this.presentToastWithOptions(msg, title) // prompt toast while in the app
      this.showAlert(title, msg, id, date);

    });
    this.oneSignal.endInit();
  }




  async presentToastWithOptions(msg, title) { const toast = await this.toast.create({ header: title, message: msg, position: 'bottom', duration: 5000, buttons: [{ text: 'View', handler: () => { console.log('Cancel clicked'); this.router.navigateByUrl('/notification'); } }] }); toast.present(); }

  async showAlert(title, msg, id, date) {

    const noti = { id: id, title: title, msg: msg, date: date };
    //alert("test: " + noti[0]);
    this.newNotif = noti
    this.ntfService.addNoti(this.newNotif).then(item => {
      this.newNotif = <Notif>{}
      console.log(item + ' insert')

    });

  }
  showRatePrompt() {
    
    this.platform.ready().then(
      () => {
        this.appRate.preferences = {
          displayAppName: 'TPOH 2021',
          usesUntilPrompt: 5,
          promptAgainForEachNewVersion: false,
          inAppReview: true,
          storeAppURL: {
            ios: '1543665813',
            android: 'market://details?id=com.xephylonstudio.tpopenhouse2020'
          },
          customLocale: {
            title: "Would you mind rating %@?",
            message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
            cancelButtonLabel: "No, Thanks",
            laterButtonLabel: "Remind Me Later",
            rateButtonLabel: "Rate It Now",
            yesButtonLabel: "Yes!",
            noButtonLabel: "Not really",
            appRatePromptTitle: 'Do you like using %@?',
            feedbackPromptTitle: 'Mind giving us some feedback?',
          },
          callbacks: {
            onRateDialogShow: function (callback) {
              callback(1) // cause immediate click on 'Rate Now' button
            },
            onButtonClicked: function (buttonIndex) {
              console.log("onButtonClicked -> " + buttonIndex);
            }
          },
    
        };
    
        this.appRate.promptForRating(false);
      })
    }


}
