import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-dev-info',
  templateUrl: './dev-info.page.html',
  styleUrls: ['./dev-info.page.scss'],
})
export class DevInfoPage implements OnInit {

  dev: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private statusBar: StatusBar,) { }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#AD0000');
    this.statusBar.styleLightContent();
    this.dev = this.navParams.get('paramDev');
    console.log(this.dev)
  }

  ionViewDidLeave() {
    this.statusBar.backgroundColorByHexString('#9a0007');
    this.statusBar.styleLightContent();
  }

  async cancel() {
    this.modalCtrl.dismiss();

  }

}
