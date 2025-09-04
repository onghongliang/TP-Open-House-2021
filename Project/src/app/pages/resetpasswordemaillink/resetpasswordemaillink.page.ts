import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 
import 'firebase/auth'; 
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export interface sendEmail{
  email: string
} 


@Component({
  selector: 'app-resetpasswordemaillink',
  templateUrl: './resetpasswordemaillink.page.html',
  styleUrls: ['./resetpasswordemaillink.page.scss'],
})
export class ResetpasswordemaillinkPage implements OnInit {
  passwordReset_form : FormGroup

  constructor(private authService : AuthenticationService, private formBuilder : FormBuilder) { 
    this.passwordReset_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]))
    })
  }

  ngOnInit() {
  }
  sendEmail(val : sendEmail){
    this.authService.fireSendEmail(val).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })

  }
  get email() { return this.passwordReset_form.get('email'); }

}
