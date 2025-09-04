import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  userlogged: any;
  badge = []

  asc = {
    name: 'ASC', school: 'Applied Science', color: '#82D035' // 'limegreen'
  }
  bus = {
    name: 'BUS', school: 'Business', color: '#FFDD00' // 'yellow'
  }
  des = {
    name: 'DES', school: 'Design', color: '#1BB5BF' // 'lightseagreen'
  }
  eng = {
    name: 'ENG', school: 'Engineering', color: '#82378C' // 'purple'
  }
  hss = {
    name: 'HSS', school: 'Humanities & Social Sciences', color: '#F29200' // 'orange'
  }
  iit = {
    name: 'IIT', school: 'Informatics & IT', color: '#0087C9' // 'blue'
  }

  constructor(
    public alertController: AlertController,
    private router: Router,
    private toast: ToastService,
    private fav: FavoriteService,
    private changeRef: ChangeDetectorRef,
  ) {
    firebase.auth().onAuthStateChanged(e => {
      this.userlogged = e
    })
  }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.checkBadge()
  }

  checkBadge() {
    this.fav.getFavorites().then(e => {
      this.badge = []
      if (e) {
        this.badge = e
      }
      this.changeRef.detectChanges()
    })
  }


  openAsc() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.asc,
    });
  }
  openBus() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.bus,
    });
  }
  openDes() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.des,
    });
  }
  openEng() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.eng,
    });
  }
  openHss() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.hss,
    });
  }
  openIit() {
    this.router.navigate(['/c-by-school'], {
      queryParams: this.iit,
    });
  }
  guestAlert() {
    let header = "Guest Mode"
    let msg = "Please register/login to save and view saved course(s)"
    this.toast.presentAlert(header, msg)
  }
}
