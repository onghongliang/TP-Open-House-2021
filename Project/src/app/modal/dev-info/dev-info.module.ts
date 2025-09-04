import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevInfoPageRoutingModule } from './dev-info-routing.module';

import { DevInfoPage } from './dev-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevInfoPageRoutingModule
  ],
  declarations: [DevInfoPage]
})
export class DevInfoPageModule {}
