import { Component, OnInit, ɵConsole, ChangeDetectorRef  } from '@angular/core';
import {Platform, LoadingController, NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Storage } from '@ionic/storage'
import { Notif, NotificationService } from 'src/app/services/notification/notification.service';
import { async } from 'q';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notiList: Array<any>;
  public notiRef: firebase.database.Reference;
  notis: Notif[] = [];
  data: any = '';
  avail: boolean;
  sub: any;
  sub1: any;

 constructor(private changeRef: ChangeDetectorRef , private platform: Platform, private route: ActivatedRoute, public navCtrl: NavController,
   public alertController: AlertController, public storage: Storage, private scheService: NotificationService, private statusBar: StatusBar,    private router: Router,) { 

   
  this.avail = true
   }

   ngOnInit() {
     //This resume runs only when the user opens the application from the background. In this case, allowing the application to update
     //its notification data, showing the latest notification if its sent.
     this.sub = this.platform.resume.subscribe(async () =>{
       console.log('Resume event detected');
       this.ionViewWillEnter();
     });
    
     
   }

   //Will refresh the page if new notification is sent
   ionViewWillEnter(){
     this.getData();

   
    
   }

   getData(){
    setTimeout(() => { //Sets a timeout to allow the server time to add the data into the database and display it
      this.avail = true
      this.scheService.getNoti().then(noti => {
  
        let obj = []
  
        if (noti) {
        
          noti.forEach(item => {
            let thing = item
  
            // console.log(thing)
            obj.push(thing);
            
            this.avail = false
            
          })
          this.notis = obj.reverse();
         
        }
        
      });
      
    }, 50);  
   }

   //When the user pulls up to refresh the data
   doRefresh(event) {
     console.log('Begin async operation');

       console.log('Async operation has ended');
       if(event.target.complete()){
        this.getData();
       }

   }

   //Unsubscribe the resume when the user leaves the app/page, prevents the 'subscribe' from stacking up each time the user enters through the background
   ionViewDidLeave(){
     this.sub.unsubscribe();
   }


   
 async clearInbox(){
   this.statusBar.backgroundColorByHexString('#AD0000');
   const alert = await this.alertController.create({
     header: 'Inbox',
     message: 'Clear your inbox?',
     buttons:[
       {
         text:'No',
         role: 'cancel',
         cssClass:'secondary',
         handler:()=>{
           //When user clicks no
           this.statusBar.backgroundColorByHexString('#FF0000');
         }
       },
       {
         text: 'Yes',
         handler: ()=>{
           //When user accepts
           this.statusBar.backgroundColorByHexString('#FF0000');
           this.scheService.deleteNotif2();
           this.navCtrl.pop();
         }
       }
     ]
     
   });
   await alert.present();
 }

}
