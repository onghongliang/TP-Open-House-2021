import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import * as firebase from 'firebase'; import 'firebase/auth'; import 'firebase/firestore';

@Component({
  selector: 'app-faqdetails',
  templateUrl: './faqdetails.page.html',
  styleUrls: ['./faqdetails.page.scss'],
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
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 },))
      ])
    ])
  ]
})
export class FaqdetailsPage {

  info: any;
  loader: any;
  loadingController: any;

  constructor(private route: ActivatedRoute,
    public router: Router) {
    firebase.database().ref('funfacts/' + this.route.snapshot.paramMap.get('key')).on('value', resp => {
      this.info = snapshotToObject(resp);
      console.log(this.info)
    });

  }

}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  console.log(item)
  item.key = snapshot.key;

  return item;
}
