import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as firebase from 'firebase';
import 'firebase/auth';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ChangeInfoPage } from '../change-info/change-info.page';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  data: any;
  user; // from authen DB
  imageRoute;
 
  fireData: any;  // From RT DB
  constructor(
    private authService: AuthenticationService,
    private navStrl: NavController,
    private modalController: ModalController,
    public alertController: AlertController,
    private toast: ToastService,
    private camera: Camera,
    private crop: Crop,
    private base64: Base64,
    private changeRef: ChangeDetectorRef,
  ) {  }

  ngOnInit() {
   this.retrieveUserInfo()
  }

  retrieveUserInfo() {
    if (firebase.auth().currentUser == null) {
      console.log("no user")
    } else {
      this.user = firebase.auth().currentUser;
      this.FireData(this.user.uid)
      this.changeRef.detectChanges()
      this.imageRoute = firebase.storage().ref(this.user.uid)
    }
  }


  async FireData(uid) {
    const fire = firebase.database().ref('users/' + uid);
    await fire.once('value', snapshot => {
      this.fireData = snapshot.val()
      console.log(this.fireData)
    })
  }

  async presentModal(view, user) {
    const modal = await this.modalController.create({
      component: ChangeInfoPage,
      cssClass: 'change-info',  
      componentProps: {
        view,
        user
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const onReturn = data['data'];
        console.log(onReturn)
        if (onReturn) {
          this.FireData(this.user.uid)
        }

      })
    return await modal.present()
  }

  signOut() {
    this.authService.signOut().then((res => {
      let msg = "Succesfully logged out"
      this.toast.presentToast(msg)
      this.navStrl.navigateRoot('/')
    })).catch(() => {
      this.toast.errorToast(null)
    })
  }

  async deleteFire(id) {
    await firebase.database().ref('users').child(id).remove().then((s) => {
      let msg = 'Account successfully deleted.'
      this.toast.presentToast(msg)
      this.navStrl.navigateRoot('/')
      console.log("success")
    }).catch((e) => {
      console.log(e)
    })
    await this.imageRoute.delete().then((s)=>{
      console.log('successfully deleted')
    })
  }

  deleteAccount(val) {
    var id = val.uid
    this.user.delete().then(async() => {
      this.deleteFire(id)

    }).catch(e => {
      let temp = val
      if (e.code == "auth/requires-recent-login") {
        this.presentAlertPrompt(temp)
      } else {
        this.toast.errorToast(null)
      }
    })
  }

  async presentAlert() {
    let msg1 = 'You will be logged out and email verification will be sent \
    to your email.'
    let msg2 = "This account will be totally removed from our database including leaderboards points \
                that contributes to your school."

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: msg2,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteAccount(this.user)
            // FUNCTION
          }
        }
      ]
    });
    await alert.present();
  }


  async presentAlertPrompt(val) {
    let msg1 = 'Please enter password to confirm'
    let msg2 = 'Please enter old password to confirm'

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msg1,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Please enter your password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (data) => {
            console.log(data)

            const credential = firebase.auth.EmailAuthProvider.credential(
              this.user.email, data.password);
            this.user.reauthenticateWithCredential(credential).then((s) => {
              // requires some time to re-authenticate...1 sec
              console.log(s)
              setTimeout(() => {
                this.deleteAccount(val)
              }, 1000)

            }).catch(e => {
              console.log(e)
              this.toast.errorToast(null)
            })

          }
        }
      ]
    });
    await alert.present();
  }
  uploadtype(){
    this.alertController.create({
      header: 'Upload via?',
      buttons: [{
        text: 'Camera',
        handler:()=>{
          this.cameraupload()
        }
      },
    {
      text: "Choose from gallery",
      handler:()=>{
        this.galleryupload()
      },
      
    },{
      text: "Remove profile image",
      handler:()=>{
        this.removeimage()
      }
    }]
    }).then((alert)=>{
      alert.present()
    })
  }
  cameraupload(){
    let options: CameraOptions ={
      quality : 100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType : this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit: false
    }
    this.camera.getPicture(options).then((data)=>{
      this.crop.crop(data, {targetHeight: 1200, targetWidth: 1200}).then((newImg)=>{
        var storage = firebase.storage().ref(firebase.auth().currentUser.uid)
        this.base64.encodeFile(newImg).then((base64file)=>{
          console.log(base64file + "base64 success")
          storage.putString(base64file, "data_url").then(async (savedimage)=>{
            savedimage.ref.getDownloadURL().then(async (res)=>{
              console.log(res)
              this.updateInUserDB(res)
            })
          })
        })

      })
    })
  }
  async galleryupload(){
    let options: CameraOptions ={
      quality : 100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType : this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false
    }
    this.camera.getPicture(options).then((data)=>{
      this.crop.crop(data, {targetHeight: 1200, targetWidth: 1200}).then((newImg)=>{
        var storage = firebase.storage().ref(firebase.auth().currentUser.uid)
        this.base64.encodeFile(newImg).then((base64file)=>{
          console.log(base64file + "base64 success")
          storage.putString(base64file, "data_url").then(async (savedimage)=>{
            savedimage.ref.getDownloadURL().then(async (res)=>{
              console.log(res)
              this.updateInUserDB(res)
            })
          })
        })

      })
    })
  }
  async updateInUserDB(res){
    await firebase.auth().currentUser.updateProfile({
      photoURL: res
    }).then(async (result)=>{
      console.log(result)
      await this.toast.presentToast("Profile image succesfully changed")
      setTimeout(() => {
        this.retrieveUserInfo()
      }, 500);

    }).catch((err)=>{
      console.error(err)
    })
  }
  removeimage(){
    this.imageRoute.delete().then((s)=>{
      console.log('successfully deleted')
    })
    firebase.auth().currentUser.updateProfile({
      photoURL: null
    }).then((result)=>{
      this.toast.presentToast('Profile image successfully removed')
      setTimeout(() => {
        this.retrieveUserInfo()
      }, 500);
    }).catch((err)=>{
      console.log(err)
    })
  }

}
