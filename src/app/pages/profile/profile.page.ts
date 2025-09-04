import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';
import { ToastService } from 'src/app/services/toast-alert/toast.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // currentEmail: any;
  user: any = {};

  currentPass: any;
  secureKey: any;
  secureIV: any;
  userPass: any;
  name: any;
  userschool: any;
  points: any;
  userimage: any;
  usercurrentimage: any;

  usertype: any;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private camera: Camera,
    private alertController: AlertController,
    private changeRef: ChangeDetectorRef,
    private toast: ToastService
    // NOTE!!!: firebaseauth can store basic fields such as email, displayName, phone No.
    // dont have to use realtime DB to pull out as it can be messy 
    // one simple line of code can pull out the info about user

  ) {

  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.retrieveInfo()
  }

  retrieveInfo() {
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    this.usercurrentimage = firebase.auth().currentUser.photoURL
    if (firebase.auth().currentUser == null) {
      console.log("no user")
    } else {
      this.user = firebase.auth().currentUser;
      firebase.database().ref('users').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        this.points = snapshot.val().points
        this.userschool = snapshot.val().school ? snapshot.val().school : " - "; // if no school ruturn -
        this.currentPass = snapshot.val().password
        this.secureIV = snapshot.val().secureIV
        this.usertype = snapshot.val().user ? snapshot.val().user : " - "
        this.secureKey = snapshot.val().secureKey
        this.authService.decryptPass(this.secureKey, this.secureIV, this.currentPass).then((res) => {
          console.log(res)
          this.userPass = res
        }).catch((err) => {
          console.log(err)
        })
      })
    }
    this.changeRef.detectChanges();
  }

}
