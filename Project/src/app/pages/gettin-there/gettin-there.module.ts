import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GettinTherePageRoutingModule } from './gettin-there-routing.module';

import { GettinTherePage } from './gettin-there.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GettinTherePageRoutingModule
  ],
  declarations: [GettinTherePage]
})
export class GettinTherePageModule {}
