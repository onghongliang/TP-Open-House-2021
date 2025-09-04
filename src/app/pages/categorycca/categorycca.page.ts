import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';

@Component({
  selector: 'app-categorycca',
  templateUrl: './categorycca.page.html',
  styleUrls: ['./categorycca.page.scss'],
})
export class CategoryccaPage implements OnInit {
  ccaType: string;
  public ccaRef: any
  public cca: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private changeRef: ChangeDetectorRef) { 
    this.route.queryParams.subscribe((res) => {
      this.ccaType = res['type']
      console.log(this.ccaType)
    })
  }

  ngOnInit() {
    this.ccaRef = firebase.database().ref('cca').orderByChild('type').equalTo(this.ccaType);
    this.ccaRef.on('value', resp => {
     
      let listcca = [];

      resp.forEach(course => {
        let item = course.val();
        item.key = course.key;
        listcca.push(item);
      });
 
      this.cca = listcca;
      this.changeRef.detectChanges()
    });
  }
 
}
