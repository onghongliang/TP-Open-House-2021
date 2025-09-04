import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForTheGramPage } from './for-the-gram.page';

const routes: Routes = [
  {
    path: '',
    component: ForTheGramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForTheGramPageRoutingModule {}
