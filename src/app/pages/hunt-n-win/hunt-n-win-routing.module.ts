import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HuntNWinPage } from './hunt-n-win.page';

const routes: Routes = [
  {
    path: '',
    component: HuntNWinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuntNWinPageRoutingModule {}
