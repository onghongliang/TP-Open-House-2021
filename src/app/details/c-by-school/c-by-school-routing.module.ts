import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CBySchoolPage } from './c-by-school.page';

const routes: Routes = [
  {
    path: '',
    component: CBySchoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CBySchoolPageRoutingModule {}
