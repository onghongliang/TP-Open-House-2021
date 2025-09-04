import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsccaPage } from './detailscca.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsccaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsccaPageRoutingModule {}
