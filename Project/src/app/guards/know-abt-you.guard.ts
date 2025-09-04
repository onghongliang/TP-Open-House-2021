import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class KnowAbtYouGuard implements CanActivate {
  id: any;
  checked: any;
  constructor(private router: Router) {
    // let fire = firebase.auth().currentUser
    // this.id = fire ? fire.uid : null;
    this.id = firebase.auth().currentUser.uid
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.id) {
      this.checkData()
    }
    return true
  }

  async checkData() {
    await firebase.database().ref('users').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      console.log(snapshot.val())
      const info = snapshot.val().user
    
      if (this.id === null || undefined) {
        this.router.navigate(["main"]);
        return false
      }

      if (info === null || info === undefined) {
        this.router.navigate(["know-abt-you"]);
        return false
      }

    })
  }

}
