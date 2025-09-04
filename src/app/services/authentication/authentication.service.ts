import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import 'firebase/auth';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';


export interface Auth {
  email: string,
  password: string
}
export interface reg {
  name:string,
  email: string,
  school:string,
  password: string,
  confirmPassword: string
}
export interface sendEmail {
  email: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private secureKey: string;
  private secureIV: string;
  userSecureKey: string;
  userSecureIV: string;
  userPass: string;

  game = [
    {
      venue: 'informatics',
      completed: false
    },
    {
      venue: 'science',
      completed: false
    },
    {
      venue: 'business',
      completed: false
    },
    {
      venue: 'humanities',
      completed: false
    },
    {
      venue: 'engineering',
      completed: false
    },
    {
      venue: 'design',
      completed: false
    },
    {
      venue: 'library',
      completed: false
    },
    {
      venue: 'macsub',
      completed: false
    },
    {
      venue: 'bedokres',
      completed: false
    },
    {
      venue: 'gcv',
      completed: false
    },
    {
      venue: 'foyerramp',
      completed: false
    },
    {
      venue: 'roundabt',
      completed: false
    },
    {
      venue: 'triangulargarden',
      completed: false
    },
    {
      venue: 'horseshoe',
      completed: false
    },
  ]

  constructor(
    private toastController: ToastController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private aes256: AES256,
    private navCtrl: NavController,
    private storage: Storage,
    private loading: LoadingController,
    private oneSignal: OneSignal,
    private ngZone: NgZone,
  ) {
    this.generateSecureKeyAndIV()
  }
  fireLogin(auth: Auth) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(auth.email, auth.password)
        .then(res => {
          resolve(res)
          this.storage.set('guest', false)
          this.showToast("Successfully Login!")
          this.router.navigateByUrl("/main");
        })
        
        .catch((err) => {
          reject(err)
          if (err.code == "auth/user-not-found") {
            this.showToast("User not found!")
          } else if (err.code == "auth/wrong-password") {
            this.showToast("Invalid email or password")
          } else {
            this.showToast("Fail to sign in. Please try again.")
          }
        })
    })
  }

  async generateSecureKeyAndIV() {
    this.secureKey = await this.aes256.generateSecureKey('pass'); 
    this.secureIV = await this.aes256.generateSecureIV('pass'); 
  }

  fireRegister(register: reg) {
    return new Promise(async (resolve, reject) => {
      await firebase.auth().createUserWithEmailAndPassword(register.email, register.password)
        .then(async res => {
          resolve(res)
          // NOTE: temporary disable encryptPass
          await this.encryptPass(register.password, register.name)
          // this.encryptPass(register.password, register.name,register.school)
          // TODO: Create email verification...
          setTimeout(() => {}, 2000);
          // SET displayName create by user
          this.afAuth.onAuthStateChanged((user) => {
            user.updateProfile({
              displayName: register.name
            })
          })
          // NOTE: Not ideal to go main upon sign up, verify first before entering
          this.router.navigateByUrl("/main");
        })
        .catch((err) => {
          reject(err)
          if(err.code == "auth/email-already-in-use"){
            this.showToast("Failed to sign up. Email is in use.")
          } else {
            this.showToast("Failed to sign up. Please try again.")
          }
        })
    })
  }
  encryptPass(password: reg["password"], name: reg["name"]) {
    // return new Promise((resolve, reject) => {
    //   this.aes256.encrypt(this.secureKey, this.secureIV, password).then((res) => {
    //     resolve(res)
        return new Promise(async(resolve, reject) => {
          await firebase.database().ref('users').child(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            name: name,
            points: 0,
            game: this.game
            // password: res,  
            // school:school,
            // secureIV: this.secureIV,
            // secureKey: this.secureKey
          }).then((res) => {
            resolve(res)
            this.storage.set('guest', false)
          }).catch((err) => {
            this.showToast("Sign up has failed")
            reject(err)
          })
        })
  }


  decryptPass(userSecureKey, userSecureIV, userPass) {
    return new Promise(async (resolve, reject) => {
      await this.aes256.decrypt(userSecureKey, userSecureIV, userPass)
        .then((res) => {
          resolve(res)
          console.log(res)
        }).catch((err) => {
          reject(err)
        })
    })
  }


  fireSendEmail(sendMail: sendEmail) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(sendMail.email)
        .then((res) => {
          resolve(res)
          this.showToast("Check your email")
        }).catch((err) => {
          reject(err)
          if (err.code == "auth/user-not-found") {
            this.showToast("Invalid user")
          }
        })
    })
  }


  // reusable toast function
  async showToast(msg) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: msg
    })
    toast.present()
  }

  signOut(){
    return new Promise((resolve,reject)=>{
      firebase.auth().signOut().then((res=>{
        resolve(res)

        this.oneSignal.deleteTag('login');
        this.oneSignal.sendTag('guest', 'guest');
        this.router.navigateByUrl('/intro-page')
        this.showToast("Successfully signed out!")
      })).catch((err)=>{
        this.showToast("Fail to sign out. Please try again.")
        reject(err)
      })
    })
  }
  deleteAccount(){
    return new Promise((resolve,reject)=>{
      firebase.auth().currentUser.delete().then((res)=>{
        resolve(res)
        this.router.navigateByUrl('/login')
        this.showToast("Successfully deleted your account")
      }).catch((err)=>{
        this.showToast("Fail to sign out. Please try again.")
        reject(err)
      })
    })
  }


   async checkAuth() {
    this.ngZone.run(async() => {
      this.presentLoading()
      const user = await firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
      const guest = await this.storage.get('guest');
  
      firebase.auth().onAuthStateChanged(e => {
        console.log(guest)
        if (e) {
          this.navCtrl.navigateRoot('main')
          console.log("logged in") 
        } else if (guest) {
          this.navCtrl.navigateRoot('main')
        } else {
          this.navCtrl.navigateRoot('intro-page')
        }
        this.loading.dismiss()
      })
        
    })

 
  }
  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
