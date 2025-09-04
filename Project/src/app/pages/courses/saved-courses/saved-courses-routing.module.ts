import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedCoursesPage } from './saved-courses.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedCoursesPageRoutingModule {}
