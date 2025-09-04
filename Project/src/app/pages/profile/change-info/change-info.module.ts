import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeInfoPageRoutingModule } from './change-info-routing.module';

import { ChangeInfoPage } from './change-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangeInfoPageRoutingModule
  ],
  declarations: [ChangeInfoPage]
})
export class ChangeInfoPageModule {}
