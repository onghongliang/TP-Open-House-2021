import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CDetailsPage } from './c-details.page';

const routes: Routes = [
  {
    path: '',
    component: CDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CDetailsPageRoutingModule {}
