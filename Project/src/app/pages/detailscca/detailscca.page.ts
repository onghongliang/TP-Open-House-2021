import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-detailscca',
  templateUrl: './detailscca.page.html',
  styleUrls: ['./detailscca.page.scss'],
  animations: [
    trigger('fadein', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('900ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slidelefttitle', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ])
  ]
})
export class DetailsccaPage implements OnInit {
  info: any;

  constructor(private route: ActivatedRoute, 
    private changeRef: ChangeDetectorRef,
    public platform: Platform,
    public router: Router) { 
    firebase.database().ref('cca/' + this.route.snapshot.paramMap.get('key')).on('value', resp => {
      this.info = snapshotToObject(resp);
      this.changeRef.detectChanges()
    });
  }

  ngOnInit() {
  }

}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;

}

