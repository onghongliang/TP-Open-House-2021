import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakanTimePageRoutingModule } from './makan-time-routing.module';

import { MakanTimePage } from './makan-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakanTimePageRoutingModule
  ],
  declarations: [MakanTimePage]
})
export class MakanTimePageModule {}
