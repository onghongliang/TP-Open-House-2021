import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CDetailsPageRoutingModule } from './c-details-routing.module';

import { CDetailsPage } from './c-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CDetailsPageRoutingModule
  ],
  declarations: [CDetailsPage]
})
export class CDetailsPageModule {}
