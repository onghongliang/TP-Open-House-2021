import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolyWebinarPageRoutingModule } from './poly-webinar-routing.module';

import { PolyWebinarPage } from './poly-webinar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolyWebinarPageRoutingModule
  ],
  declarations: [PolyWebinarPage]
})
export class PolyWebinarPageModule {}
