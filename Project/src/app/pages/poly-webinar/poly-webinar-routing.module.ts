import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolyWebinarPage } from './poly-webinar.page';

const routes: Routes = [
  {
    path: '',
    component: PolyWebinarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolyWebinarPageRoutingModule {}
