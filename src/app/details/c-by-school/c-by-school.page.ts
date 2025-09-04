import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-c-by-school',
  templateUrl: './c-by-school.page.html',
  styleUrls: ['./c-by-school.page.scss'],
})
export class CBySchoolPage implements OnInit {

  data = false;
  // get data from previous clicked
  school: any;
  category: any;
  setColor: any;
  colorCode: any;
  bg_image = ""
  // filter course
  courses = [];
  ref: any;

  // filter school info
  schoolinfo = [];
  inforef: any;
  desc1: any;
  txtColor: string;


  constructor(
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private changeRef: ChangeDetectorRef
  ) {


  }
  ngOnInit() {
    var _schoolinfo = []
    var _courses = []

    this.route.queryParams.subscribe(async(res) => {
      this.school = res['name'] // set page title
      this.category = res['school'] // set school name 
      this.setColor = res['color'] // set color 

      const courses = firebase.database().ref('Courses').orderByChild('school').equalTo(res['school']).once('value'); // input school name into equalTo
      const schoolinfo = firebase.database().ref('schoolinfo').orderByChild('school').equalTo(res['school']).once('value'); // input school name into equalTo
     
      await courses.then(d => {
        _courses = [];
        let response = d;
        response.forEach(e => {
          let data = e.val();
          data.key = e.key;
          _courses.push(data);
        })
      })
  
      await schoolinfo.then(d => {
        _schoolinfo = [];
        let response = d
        response.forEach(e => {
          let data = e.val();
          data.key = e.key;
          _schoolinfo.push(data);
        })
      })
  
      this.data = true;
      this.courses = _courses;
      this.schoolinfo = _schoolinfo;
      this.bg_image = _schoolinfo[0].image;
      this.filterColor(); // set color code

      this.changeRef.detectChanges();
    })


  }

  filterColor() {
    if (this.category == 'Applied Science') {
      this.colorCode = '#82D035'
      this.txtColor = "white"

    }

    else if (this.category == 'Business') {
      this.colorCode = '#FFDD00';
      this.txtColor = 'black';

    }

    else if (this.category == 'Design') {
      this.colorCode = '#1BB5BF';
      this.txtColor = 'white';

    }

    else if (this.category == 'Engineering') {
      this.colorCode = '#82378C';
      this.txtColor = 'white';

    }

    else if (this.category == 'Humanities & Social Sciences') {
      this.colorCode = '#F29200';
      this.txtColor = 'black';

    }

    else if (this.category == 'Informatics & IT') {
      this.colorCode = '#0087C9';
      this.txtColor = 'white';

    }
    setTimeout(() => {
      this.changeRef.detectChanges();
    }, 2000);
  }

}