import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampusTourPageRoutingModule } from './campus-tour-routing.module';

import { CampusTourPage } from './campus-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampusTourPageRoutingModule
  ],
  declarations: [CampusTourPage]
})
export class CampusTourPageModule {}
