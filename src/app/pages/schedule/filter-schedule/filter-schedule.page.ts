import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filter-schedule',
  templateUrl: './filter-schedule.page.html',
  styleUrls: ['./filter-schedule.page.scss'],
})
export class FilterSchedulePage implements OnInit {
  department = "All";
  category = "All";
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
    ) { 
      console.log(this.navParams.data)
      const onReceive = this.navParams.data
      this.department = onReceive.department
      this.category = onReceive.category
    }

  ngOnInit() {
  }
  onChangeDep(evt) {
    console.log(evt)
    console.log(this.department)
  }

  onChangeCat(evt) {
    console.log(evt)
    console.log(this.category)
  }

  dismiss() {
    this.modalCtrl.dismiss({
      department: this.department,
      category: this.category
    })
  }
}
