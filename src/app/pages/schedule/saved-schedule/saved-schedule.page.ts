import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Storage } from '@ionic/storage'
import { ModalController, ToastController } from '@ionic/angular';
import { ScheduleModalPage } from '../schedule-modal/schedule-modal.page';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
@Component({
  selector: 'app-saved-schedule',
  templateUrl: './saved-schedule.page.html',
  styleUrls: ['./saved-schedule.page.scss'],
})
export class SavedSchedulePage  {
  notis: any = []
  currentdate: any;
  avail: boolean;


  constructor(
    public storage: Storage,
    private scheService: ScheduleService,
    private datePipe: DatePipe,
    private modalController: ModalController,
    private oneSignal: OneSignal,
    private toast: ToastService,
  ) {}


  loadData() {
    this.toast.presentLoading(null)
    this.notis = []
    var date = new Date();
    this.currentdate = this.datePipe.transform(date, "yyMMddHHmm")
    this.scheService.getAllSchedule().then(s => {
      this.toast.stopLoading()
      const allSche = s
      this.scheService.getSchedule().then(d => {
        
        const savedItem = d
        if (savedItem) {
          savedItem.map(item => {
            const chk = allSche.find(x => x.id == item)
            if (chk) {
              if (this.currentdate > chk.date)
                chk.date = true
              this.notis.push(chk)
            } else {
              this.notis.push(chk)
            }
          })
          this.notis = this.notis.sort((a, b) => {
            return b.date + a.date
          })
        }
      }).catch(e => {
        this.toast.stopLoading()
      })
    }).catch(e => {
      this.toast.stopLoading()
    })
    console.log(this.notis)
  }

  ionViewWillEnter() {
    this.loadData()
  }


  remove(id) {
    var newArr = []
    this.notis.filter(e => {
      if (e.id !== id) {
        newArr.push(e.id)
      }
    })
    this.scheService.removeSche(newArr).then(e => {
      this.oneSignal.deleteTag(id.toString());
      setTimeout(() => {
        this.loadData()
      }, 500);
    })
    console.log(this.notis)
  }

  async viewModal(details) {
    const modal = await this.modalController.create({
      component: ScheduleModalPage,
      cssClass: 'schedule-modal',
      componentProps: details
    });
    return await modal.present();
  }
}
