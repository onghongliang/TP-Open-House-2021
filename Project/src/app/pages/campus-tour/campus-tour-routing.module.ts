import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampusTourPage } from './campus-tour.page';

const routes: Routes = [
  {
    path: '',
    component: CampusTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampusTourPageRoutingModule {}
