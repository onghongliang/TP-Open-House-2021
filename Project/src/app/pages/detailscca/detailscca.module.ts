import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsccaPageRoutingModule } from './detailscca-routing.module';

import { DetailsccaPage } from './detailscca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsccaPageRoutingModule
  ],
  declarations: [DetailsccaPage]
})
export class DetailsccaPageModule {}
