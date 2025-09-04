import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { ToastService } from '../toast-alert/toast.service';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { OneSignal } from '@ionic-native/onesignal/ngx';



const SAVED = "savedSchedule"

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  uid: any;
  constructor(
    public storage: Storage,
    public toastController: ToastController,
    public toast: ToastService,
    private oneSignal: OneSignal,
  ) {

  }


  async addSchedule(sche) {
    this.getSchedule().then(e => {
      var getSchedule = e // array of sche

      if (getSchedule) {
        console.log(sche)
        console.log(sche)
        const find = getSchedule.find(e => e == sche)
        if (find) {
          let i = "You already save this schedule"
          this.toast.presentToast(i)
        } else {
          console.log('insert')
          this.oneSignal.sendTag(sche,sche);
          getSchedule.push(sche)
          this.pushSche(getSchedule)
        }
      } else {
        this.oneSignal.sendTag(sche,sche);
        this.pushSche([sche])
      }

    })
    // const fire = firebase.database().ref('users/' + this.uid).up 
  }

  async pushSche(shceArray) {
    await this.storage.set(SAVED ,shceArray).then((e) => {
      let i = "Schedule saved successfully"
      this.toast.presentToast(i)
    }).catch((e) => {
      this.toast.errorToast(null)
    })
  }

  async removeSche(array) {
    await this.storage.set(SAVED, array).then((e) => {
      let i = "Successfully removed schedule"
      this.toast.presentToast(i)
    }).catch((e) => {
      this.toast.errorToast(null)
    })
  }


  async getAllSchedule() {
    var ar1
    var ar2
    var ar3
    const fire1 = firebase.database().ref('schedule').child("Day 1");
    const fire2 = firebase.database().ref('schedule').child("Day 2");
    const fire3 = firebase.database().ref('schedule').child("Day 3");
    const snap1 = await fire1.once('value');
    const snap2 = await fire2.once('value');
    const snap3 = await fire3.once('value');

    var final = snap1.val().concat(snap2.val(), snap3.val())
    return final
    // return await fire1.concat(await ar2,await ar3)
  }


  async getSchedule() {
    return await this.storage.get(SAVED);
  }

}
