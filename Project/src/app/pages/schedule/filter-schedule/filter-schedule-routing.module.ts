import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterSchedulePage } from './filter-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: FilterSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterSchedulePageRoutingModule {}
