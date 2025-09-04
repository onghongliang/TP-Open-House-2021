import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-saved-courses',
  templateUrl: './saved-courses.page.html',
  styleUrls: ['./saved-courses.page.scss'],
})
export class SavedCoursesPage implements OnInit {
  uid: any;
  data = []
  constructor(
    private fav: FavoriteService,
  ) {

  }

  getData() {
    this.data = []
    this.fav.getFavorites().then(e => {
      const saved = e;
      if (saved) {
        console.log(saved)
        saved.map(async e => {
          await firebase.database().ref('Courses').child(e).once('value', s => {
            let item = s.val()
            item.key = e
            this.data.push(item)
          })
        })
      }
  })
}

ionViewWillEnter() {
  this.getData()
}

ngOnInit() {
}

remove(key) {
  var newArr = []
  this.data.filter(e => {
    if (e.key !== key) {
      newArr.push(e.key)
    }
  })
  console.log(newArr)
  this.fav.pushFavorite(newArr, false).then(e => {
    setTimeout(() => {
      this.getData()
    }, 500);
  })
}

}
