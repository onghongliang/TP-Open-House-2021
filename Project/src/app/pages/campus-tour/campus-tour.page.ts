import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase';
import { ToastService } from 'src/app/services/toast-alert/toast.service';


@Component({
  selector: 'app-campus-tour',
  templateUrl: './campus-tour.page.html',
  styleUrls: ['./campus-tour.page.scss'],
})
export class CampusTourPage implements OnInit {

  listVid: any

  constructor(  
    private sanitizer: DomSanitizer,
    private toast: ToastService
  ) { }

  ngOnInit() { 
    if (!this.listVid) {
      this.getVideo()
    }
  }


  async getVideo() {
    this.toast.presentLoading(null)
    this.listVid = []
    const fire = firebase.database().ref('minecraft').once('value');
    await fire.then(e => {
      var data = e.val();
      
      this.listVid = data.map(e => {
        e.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(e.videolink)
        return e
      })
    })
  }


  school() {

  }

}
