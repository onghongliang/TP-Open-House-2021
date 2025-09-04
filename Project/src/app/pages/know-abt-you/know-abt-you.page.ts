import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';
import {AuthenticationService} from '../../services/authentication/authentication.service'

const ite = { user: "", school: "" }
const secondary = { user: "", school: "" }
const jc = { user: "", school: "" }
const parent_teacher = { user: "" }
const other = { user: "", other: ""}
@Component({
  selector: 'app-know-abt-you',
  templateUrl: './know-abt-you.page.html',
  styleUrls: ['./know-abt-you.page.scss'],
})
export class KnowAbtYouPage implements OnInit {
  place: any;
  iteSchool: any;
  show = ''
  juniorC: any;
  secSchool: any;
  other: any;


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

  constructor(
    private route: Router,
    private nav: NavController,
    private authService : AuthenticationService
  ) {
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
  }

  ngOnInit() {
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
  otherFn() {
    this.object.other = this.other
    console.log(this.other)
    this.isEmpty(this.object)
  }

  submit() {
    console.log(this.object)
    const submit = firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(this.object)
    submit.then((success) => {
      console.log("pass")
      this.authService.showToast('Successfully signed up')
      this.nav.navigateRoot('/main')
    }).catch(er => {
      console.log(er)
    })
  }
}
