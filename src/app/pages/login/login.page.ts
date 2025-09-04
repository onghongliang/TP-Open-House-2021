import { ChangeDetectorRef, Component, AfterContentInit } from '@angular/core';
import 'firebase/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast-alert/toast.service';


export interface Auth {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterContentInit {
  login_form: FormGroup;

  msg: any = "";

  showPassword = false;
  passwordToggleIcon = 'eye-outline';

  constructor(
    private ToastController: ToastController,
    private authSer: AuthenticationService,
    private formBuilder: FormBuilder,
    private changeRef: ChangeDetectorRef,
    private toast: ToastService,
    // private GooglePlus: GooglePlus,
    private router: Router) {  }

  ngAfterContentInit() {
    this.login_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ]))
      
    })

    this.changeRef.detectChanges()
  }

  //Code to login user via normal authentication. Accepts email and password and shows respective toast if the sign up is successful or failed.
  login(val: Auth) {
    this.toast.presentLoading(null)
    this.authSer.fireLogin(val).then(() => {
      this.toast.stopLoading();
    }).catch((err) => {
      this.toast.errorToast(err.message);
      console.log(err)
    })
  }

  get email() { 
    return this.login_form.get('email'); }

  get password() { 
    
    return this.login_form.get('password'); }

  // Code to login user with Google. 
  // googlelogin(){
  //   let params = {
  //     'webClientId': '23723001013-pv85spq9des6m2m2f582mdstlmi8giu3.apps.googleusercontent.com',
  //     'offline': true
  //     }

  //     this.GooglePlus.login(params)
  //       .then(user => {
  //       this.msg = "Welcome " + user.email
  //       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken, null))
  //       this.ToastController.create({
  //         message: "Succesfully logged in.",
  //         duration: 3000
  //       }).then(alert => alert.present()); 
  //       this.router.navigateByUrl("/main");
  //       })
  //       .catch(err => this.msg = JSON.stringify(err).toString());
  // }

  // showPassword(val: any) {
  //   val.type = val.type === 'password' ? 'text' : 'password'
  // }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline'
    } else {
      this.passwordToggleIcon = 'eye-outline';
    }
    this.changeRef.detectChanges();
  }
}
