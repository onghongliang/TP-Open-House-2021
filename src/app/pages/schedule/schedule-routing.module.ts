import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  },
  {
    path: 'schedule-modal',
    loadChildren: () => import('./schedule-modal/schedule-modal.module').then( m => m.ScheduleModalPageModule)
  },
  {
    path: 'saved-schedule',
    loadChildren: () => import('./saved-schedule/saved-schedule.module').then( m => m.SavedSchedulePageModule)
  },
  {
    path: 'filter-schedule',
    loadChildren: () => import('./filter-schedule/filter-schedule.module').then( m => m.FilterSchedulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
