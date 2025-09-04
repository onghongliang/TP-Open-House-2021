import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tour-pop',
  templateUrl: './tour-pop.component.html',
  styleUrls: ['./tour-pop.component.scss'],
})


export class TourPopComponent implements OnInit {

  id = null
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.id = this.navParams.get('custom_id')
    console.log(this.id)
  }

  close(sch, name) {
    this.popoverController.dismiss({
      dismiss: sch,
      name: name
    })
  }
}
