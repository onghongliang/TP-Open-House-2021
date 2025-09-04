import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  public coursesList: Array<any>;
  public loadedcoursesList: Array<any>;
  public countryRef: firebase.database.Reference;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.countryRef = firebase.database().ref('funfacts');

    this.countryRef.on('value', resp => {
      let courses = [];

      resp.forEach(course => {
        let item = course.val();
        item.key = course.key;
        courses.push(item);
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
      if (v.question && q) {
        if (v.question.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.coursesList.length);
  }
}