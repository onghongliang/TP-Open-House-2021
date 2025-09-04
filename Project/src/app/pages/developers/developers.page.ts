import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { DevInfoPage } from 'src/app/modal/dev-info/dev-info.page';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage {

  data:any;
  public caroRef: firebase.database.Reference;
  public dev: Array<any>;


  constructor(
    public modalController: ModalController,
    private changeRef: ChangeDetectorRef
    ) { 
      
    this.caroRef = firebase.database().ref('developers');
    this.caroRef.on('value', resp => {
     
      let developers = [];

      resp.forEach(course => {
        let item = course.val();
        item.key = course.key;
        this.data = true;
        developers.push(item);
    
      });
      this.dev = developers;
      this.changeRef.detectChanges()
    });
  }

  async presentModal(member) {
    const modal = await this.modalController.create({
      component: DevInfoPage,
      componentProps: {
        "paramDev": member,
      },
      cssClass: 'my-custom-dev'

    });
    modal.onDidDismiss().then((dataReturned) => {
  
    });
    return await modal.present();
  }
}
