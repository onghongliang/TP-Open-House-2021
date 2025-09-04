import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedSchedulePage } from './saved-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SavedSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedSchedulePageRoutingModule {}
