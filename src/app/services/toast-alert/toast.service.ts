import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) { }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  
  async errorToast(msg) {
    let def = 'Something went wrong, please try again'

    const toast = await this.toastController.create({
      message: msg ? msg : def,
      duration: 2000
    });
    toast.present();

  }
  async presentToastWithOptions(venue, points) {
    const toast = await this.toastController.create({
      header: `${points} points!`,
      message: `You have found ${venue}!`,
      position: 'middle',
      cssClass: 'win-toast',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  async presentAlert(header, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async presentLoading(spin) {
    var spinner = spin ? spin : 'crescent' ;
    const loading = await this.loadingController.create({
      spinner: spinner,
      cssClass: 'my-custom-class',
      duration: 2000
    });
    await loading.present();
  }

  async stopLoading() {
    await this.loadingController.dismiss()
  }
}