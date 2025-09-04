import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { OneSignal } from '@ionic-native/onesignal/ngx'

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.page.html',
  styleUrls: ['./intro-page.page.scss'],
})
export class IntroPagePage {

  constructor(
    private router: Router,
    private nav: NavController,
    private storage: Storage,
    private oneSignal: OneSignal,
  ) {

  }


  ionViewDidEnter() {

    firebase.auth().onAuthStateChanged(e => {
      if (e) {
        this.oneSignal.deleteTag('login');
        this.oneSignal.sendTag('guest', 'guest');
      } else {
        this.oneSignal.sendTag('login', 'login');
        this.oneSignal.deleteTag('guest');
      }
    })
}

GuestLogin(){
  this.storage.set('guest', true).then(e => {
    this.nav.navigateRoot('/guestmain')
  })
}
}
