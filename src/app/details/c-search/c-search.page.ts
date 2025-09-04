import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-c-search',
  templateUrl: './c-search.page.html',
  styleUrls: ['./c-search.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CSearchPage implements OnInit {

  public coursesList: Array<any>;
  public loadedcoursesList: Array<any>;
  public countryRef: firebase.database.Reference;

  constructor(
    public navCtrl: NavController,
    private changeRef: ChangeDetectorRef
    
    ) { }

  ngOnInit() {
    this.countryRef = firebase.database().ref('Courses');

    this.countryRef.on('value', resp => {
      let courses = [];
      

      resp.forEach(course => {
        console.log(course.val())
        let item = course.val();
        item.key = course.key;
        courses.push(item);
        console.log(item.key)

      });
      this.coursesList = courses;
      this.loadedcoursesList = courses;
    });


  }

  initializeItems() {
    this.coursesList = this.loadedcoursesList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.coursesList = this.coursesList.filter((v) => {
      if (v.code && q ) {
        if (v.code.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.description.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    this.changeRef.detectChanges()
    console.log(q, this.coursesList.length);
  }
}
