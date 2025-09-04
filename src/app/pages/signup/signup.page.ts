import { ChangeDetectorRef, Component, AfterContentInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export interface reg {
  name: string
  email: string,
  school: string,
  password: string,
  confirmPassword: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements AfterContentInit {
  signUp_form: FormGroup


  msg: any = "";
  data: any;
  sch: Array<any>
  schoolRef: firebase.database.Reference;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private changeRef: ChangeDetectorRef

  ) { }

  ngAfterContentInit() {
    this.signUp_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])),
      // school: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ]))
    })
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
    this.changeRef.detectChanges()
  }

  
  //Codes to sign up
  signUp(val: reg) {
    console.log(val)
    this.authService.fireRegister(val).then((res) => {
      console.log(res)

    }).catch((err) => {
      console.log(err)
    })



  }
  get name() {
    return this.signUp_form.get('name');
  }
  get email() {
    return this.signUp_form.get('email');
  }
  get password() {
    return this.signUp_form.get('password');
  }
  get confirmPassword() {
    return this.signUp_form.get('confirmPassword');
    
  }
  showPassword(val: any) {
    val.type = val.type === 'password' ? 'text' : 'password'
    this.changeRef.detectChanges()
  }

  // Code to sign up user with Google. 
  // googleSignUp() {
  //   let params = {
  //     'webClientId': '23723001013-pv85spq9des6m2m2f582mdstlmi8giu3.apps.googleusercontent.com',
  //     'offline': true
  //   }

  //   this.GooglePlus.login(params)
  //     .then(user => {
  //       this.msg = "Welcome " + user.email
  //       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken, null))
  //       this.ToastController.create({
  //         message: "Succesfully sign up.",
  //         duration: 3000
  //       }).then(alert => alert.present());
  //       this.router.navigateByUrl("/main");
  //     })
  //     .catch(err => this.msg = JSON.stringify(err).toString());
  // }
  display($event) {
    console.log($event.target.value)
  }
}