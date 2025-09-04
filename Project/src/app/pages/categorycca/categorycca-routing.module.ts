import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryccaPage } from './categorycca.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryccaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryccaPageRoutingModule {}
