import { Injectable } from '@angular/core';
import { ToastService } from '../toast-alert/toast.service';
import { Storage } from '@ionic/storage'

const SAVED = "savedCourses"
@Injectable({
  providedIn: 'root'
})



export class FavoriteService {

  user: any;

  constructor(
    public storage: Storage,
    private toast: ToastService
  ) { }

  async getFavorites() {
    return await this.storage.get(SAVED);
    // return await firebase.database().ref('users/' + uid).child(SAVED).once('value')
  }
  async removeFav(key) {
    this.getFavorites().then(e => {
      var saved: any = e;
      const newArr = saved.filter(e => {
        if (e !== key) {
          return e
        }
      })
      this.pushFavorite(newArr, false)
    })
  }


  async addFavorite(key) {
    this.getFavorites().then(e => {
      var savedArr: any = e
      if (savedArr) {
        savedArr.push(key)
        this.pushFavorite(savedArr, true)
        return true
      } else {
        this.pushFavorite([key], true)
        return true
      }
    })
    return false
  }

  async pushFavorite(array, pushType) {
    const storage = this.storage.set(SAVED, array)
    // const fire = firebase.database().ref('users/' + uid).update({ savedCourses: array })
    await storage.then(s => {
      let i = pushType ? "Successfully added to favorite" : "Successfully removed";
      this.toast.presentToast(i)
    }).catch(e => {
      console.log(e)
      this.toast.errorToast(null)
    })
  }


  favoriteStatus(key) {
    this.getFavorites().then(e => {
      const savedArr = e
      return savedArr.find(x => x == key)

    })
  }
}
