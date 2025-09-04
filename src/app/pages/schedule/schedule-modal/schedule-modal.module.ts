import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleModalPageRoutingModule } from './schedule-modal-routing.module';

import { ScheduleModalPage } from './schedule-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleModalPageRoutingModule
  ],
  declarations: [ScheduleModalPage]
})
export class ScheduleModalPageModule {}
