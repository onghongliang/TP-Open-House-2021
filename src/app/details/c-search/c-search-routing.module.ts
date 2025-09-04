import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CSearchPage } from './c-search.page';

const routes: Routes = [
  {
    path: '',
    component: CSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CSearchPageRoutingModule {}
