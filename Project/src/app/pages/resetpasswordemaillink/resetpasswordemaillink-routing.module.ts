import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpasswordemaillinkPage } from './resetpasswordemaillink.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpasswordemaillinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpasswordemaillinkPageRoutingModule {}
