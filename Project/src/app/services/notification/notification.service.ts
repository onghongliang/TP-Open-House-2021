import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular';

export interface Notif {
  id: string,
  title: string,
  msg: string,
  date: string,
}

const ITEM_KEY = 'my-notification'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  noti: any;

  constructor(
    public storage: Storage,
    public toastController: ToastController) { }

  addNoti(noti: Notif): Promise<any> {  // CREATE

    return this.storage.get(ITEM_KEY).then((notis: Notif[]) => {

      if (notis == null) {

        // sches.push(sche);
        return this.storage.set(ITEM_KEY, [noti]);

      } else {

        for (let item of notis) {
          if (item.id == noti.id) {
            console.log('true')
            return null

          }
        }
        notis.push(noti);
        return this.storage.set(ITEM_KEY, notis);

      }
      });
  }

  getNoti(): Promise<Notif[]> {  // Retrieve
    return this.storage.get(ITEM_KEY);
  }


  deleteNotif2(): Promise<Notif[]>{
    return this.storage.remove(ITEM_KEY);
  }


  
  updateStuff() {


    return this.getNoti().then(notis => {
      this.noti = undefined;
      let highlight = [];
      if (notis) {  // check for noti 
        notis.forEach(item => {
          let thing = item;
          highlight.push(thing)

        });
      }
      // console.log(highlight) 
      if (highlight.length != 0) { // if number not zero, it appears
        this.noti = highlight.length

      }
      return this.noti;
    });
   
   /* this.notiRef = firebase.database().ref('notification');
    this.notiRef.on('value', resp =>{
      this.noti = undefined;
      let highlight = [];
      if(resp){
        resp.forEach(notification =>{
          let thing = notification.val();
          
          highlight.push(thing);
        });
      }
      if(highlight.length !=0){
        this.noti = highlight.length
      }
    }); */
  }

  




}