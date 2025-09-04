import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';
import { ToastService } from 'src/app/services/toast-alert/toast.service';


const ite = { user: "", school: "" }
const secondary = { user: "", school: "" }
const jc = { user: "", school: "" }
const parent_teacher = { user: "" }

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.page.html',
  styleUrls: ['./change-info.page.scss'],
})
export class ChangeInfoPage {

  place = '';
  iteSchool = '';
  show = ''
  juniorC = '';
  secSchool = '';



  data: any;
  sch: Array<any>
  schoolRef: firebase.database.Reference;
  object: any;
  disabled = true
  customPopoverOptions: any = {
    cssClass: 'custom-pop',
  };

  customAlert = {
    cssClass: 'my-class'
  }


  user: any;
  emailGrp: FormGroup
  usernameGrp: FormGroup
  passwordGrp: FormGroup

  view: any;
  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    public alertController: AlertController,
    private modalCtrl: ModalController
  ) {
    firebase.auth().onAuthStateChanged(e => {
      this.user = e
    })
    this.view = this.navParams.get('view')
    this.place = this.navParams.get('user') ? this.navParams.get('user') : null



    if (this.view == "user") {
      this.object = {}
      this.schoolRef = firebase.database().ref('secschooldata')
      this.schoolRef.on("value", (res) => {
        let schools = [];
        res.forEach(school => {
          let item = school.val()
          item.key = school.key
          this.data = true
          schools.push(item)
        });
        this.sch = schools
      })
      this.object = false;

      if (this.place) {
        this.optionsFn()
      }

      if (this.place == "Secondary Student (Graduating)" ||
        this.place == "Secondary Student (Non-graduating)") {
        this.secFn()
      }

      if (this.place == "ITE (Higher Nitec) Student" ||
        this.place == "ITE (Nitec) Student") {
        this.iteFn()
      }
      if (this.place == "JC Student") {
        this.jcFn()
      }
    }

    this.usernameGrp = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    })

    this.emailGrp = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]))
    })

    this.passwordGrp = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ]))
    })

  }

  updateUsername(val) {
    console.log(this.user)
    this.user.updateProfile({
      displayName: val.username,
    }).then(s => {
      this.user = firebase.auth().currentUser
      let msg = "Username has been updated!"
      this.updateFireUsername(val.username)
      this.modalCtrl.dismiss()
      this.toast.presentToast(msg)
    }).catch(e => {
      this.toast.errorToast(null)
    })
  }

  updateFireUsername(username) {
    firebase.database().ref('users').child(this.user.uid).update({ name: username }).then((s) => {
      //
    }).catch(er => {
      console.log(er)
    })
  }


  updateEmail(val) {
    this.user.updateEmail(val.email).then(s => {
      let msg = 'Email has been updated, please verify your email'
      this.toast.presentToast(msg)
      this.modalCtrl.dismiss()
    }).catch(e => {
      let temp = val
      console.log(e)
      if (e.code == "auth/requires-recent-login") {
        this.presentAlertPrompt('email', temp)
      } else {
        this.toast.errorToast(null)
      }
    })
  }

  confirmpass(val) {
    if (val.password !== val.confirmPassword) {
      let msg = 'Confirm password does not match!'
      this.toast.presentToast(msg)
    } else {
      this.updatePassword(val)
    }
  }

  updatePassword(val) {
    this.user.updatePassword(val.password).then(() => {
      let msg = "New password has been updated!"
      this.toast.presentToast(msg)

      this.modalCtrl.dismiss()
      // Update successful.
    }).catch((e) => {
      let temp = val
      if (e.code == "auth/requires-recent-login") {
        this.presentAlertPrompt('password', temp)
      } else {
        this.toast.errorToast(null)
      }
    });
    console.log(val)
  }


  // update email
  async presentAlert(view, val) {
    let msg1 = 'You will be logged out and email verification will be sent \
    to your email.'
    let msg2 = 'This account will totally remove from our database including leaderboards and \
                losing points for school category.'

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: msg1,
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

            if (view == 'email') {
              console.log(val)
              this.updateEmail(val)
            }

            if (view == 'delete') {

              // FUNCTION
            }

          }
        }
      ]
    });
    await alert.present();
  }



  // CREDENTIAL PW PROMPT
  async presentAlertPrompt(view, val) {

    let msg1 = 'Please enter password to confirm'
    let msg2 = 'Please enter old password to confirm'

    var custom = msg1;
    if (view == 'password') {
      custom = msg2
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: custom,
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
            if (view == "email") {
              const credential = firebase.auth.EmailAuthProvider.credential(
                this.user.email, data.password);
              this.user.reauthenticateWithCredential(credential).then((s) => {
                // requires some time to re-authenticate...1 sec
                console.log(s)
                setTimeout(() => {
                  this.updateEmail(val)
                }, 1000)

              }).catch(e => {
                console.log(e)
                this.toast.errorToast(null)
              })
            }

            if (view == "password") {
              const credential = firebase.auth.EmailAuthProvider.credential(
                this.user.email, data.password);
              this.user.reauthenticateWithCredential(credential).then((s) => {
                // requires some time to re-authenticate...1 sec
                console.log(s)
                setTimeout(() => {
                  this.updatePassword(val)
                }, 1000)
              }).catch(e => {
                console.log(e)
                this.toast.errorToast(null)
              })
            }


          }
        }
      ]
    });
    await alert.present();
  }

  optionsFn() {
    console.log(this.place)
    if (this.place === "ITE (Higher Nitec) Student" || this.place === "ITE (Nitec) Student") {
      this.object = ite
      this.show = "ite" // show ite
      this.object.user = this.place
      this.isEmpty(this.object)
    } else if (this.place === "Secondary Student (Graduating)" || this.place === "Secondary Student (Non-graduating)") {
      this.object = secondary
      this.object.user = this.place
      this.show = "secondary"
      this.isEmpty(this.object)
    } else if (this.place === "Teacher / Lecturer" || this.place === "Parent") {
      this.object = parent_teacher
      this.object.user = this.place
      this.show = ""
      this.isEmpty(this.object)
    } else if (this.place === "JC Student") {
      this.object = jc
      this.object.user = this.place
      this.show = "jc"
      this.isEmpty(this.object)
    }
    else {
      this.show = '' // show none
    }
  }



  isEmpty(obj) {
    for (var key in obj) {
      console.log(key)
      if (obj[key] !== null && obj[key] != "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }

  iteFn() {
    this.object.school = this.iteSchool
    this.isEmpty(this.object)
  }

  jcFn() {
    this.object.school = this.juniorC
    console.log(this.juniorC)
    this.isEmpty(this.object)
  }

  secFn() {
    this.object.school = this.secSchool
    this.isEmpty(this.object)
  }

  submit() {

    if (this.object.user == "Parent" || this.object.user == "Teacher / Lecturer") {
      this.object.school = null
      console.log(this.object)

      const submit = firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(this.object)
      submit.then((success) => {

        console.log("pass")
        
        let i = "User type updated successfully!"
        this.toast.presentToast(i)
        this.modalCtrl.dismiss(this.object)

      }).catch(er => {
        console.log(er)
        this.toast.errorToast(null)
      })


    } else {
      const submit = firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(this.object)
      submit.then((success) => {

        let i = "User type updated successfully!"
        this.toast.presentToast(i)
        this.modalCtrl.dismiss(this.object)
     
      }).catch(er => {
        console.log(er)
        this.toast.errorToast(null)
      })
    }

  }
}
