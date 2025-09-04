import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  ref:any
  courses = []
  data: any
  colorCode : any
  userID : any

  constructor() {
    this.userID = firebase.auth().currentUser.uid
    this.ref = firebase.database().ref("favourites").orderByChild("userID").equalTo(this.userID)
    this.ref.on('value',resp=>{
      this.data = true;
      this.courses = snapshotToArray(resp)
      console.log(this.courses)
    })
   }

  ngOnInit() {

  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}
