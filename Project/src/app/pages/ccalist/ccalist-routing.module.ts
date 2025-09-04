import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CcalistPage } from './ccalist.page';

const routes: Routes = [
  {
    path: '',
    component: CcalistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcalistPageRoutingModule {}
