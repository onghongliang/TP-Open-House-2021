import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedSchedulePageRoutingModule } from './saved-schedule-routing.module';

import { SavedSchedulePage } from './saved-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedSchedulePageRoutingModule
  ],
  declarations: [SavedSchedulePage]
})
export class SavedSchedulePageModule {}
