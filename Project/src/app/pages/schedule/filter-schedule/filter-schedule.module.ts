import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterSchedulePageRoutingModule } from './filter-schedule-routing.module';

import { FilterSchedulePage } from './filter-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterSchedulePageRoutingModule
  ],
  declarations: [FilterSchedulePage]
})
export class FilterSchedulePageModule {}
