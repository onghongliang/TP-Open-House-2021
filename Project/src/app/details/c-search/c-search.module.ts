import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CSearchPageRoutingModule } from './c-search-routing.module';

import { CSearchPage } from './c-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CSearchPageRoutingModule
  ],
  declarations: [CSearchPage]
})
export class CSearchPageModule {}
