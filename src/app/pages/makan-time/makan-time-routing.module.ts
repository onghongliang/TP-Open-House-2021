import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakanTimePage } from './makan-time.page';

const routes: Routes = [
  {
    path: '',
    component: MakanTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakanTimePageRoutingModule {}
