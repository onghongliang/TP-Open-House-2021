import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowAbtYouPage } from './know-abt-you.page';

const routes: Routes = [
  {
    path: '',
    component: KnowAbtYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowAbtYouPageRoutingModule {}
