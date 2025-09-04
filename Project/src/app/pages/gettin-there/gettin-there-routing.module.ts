import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GettinTherePage } from './gettin-there.page';

const routes: Routes = [
  {
    path: '',
    component: GettinTherePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettinTherePageRoutingModule {}
