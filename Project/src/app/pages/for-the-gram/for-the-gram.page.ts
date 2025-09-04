import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-for-the-gram',
  templateUrl: './for-the-gram.page.html',
  styleUrls: ['./for-the-gram.page.scss'],
})
export class ForTheGramPage implements OnInit {

  constructor(
    private IAB: InAppBrowser,
    private platform : Platform,
  ) { }

  ngOnInit() {
  }
  openIG() {
    this.platform.ready().then(() => {
      this.IAB.create('https://www.instagram.com/temasekpoly', "_system");
    }), er => {
      console.log(er)
    }
  }
}
