import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpasswordemaillinkPageRoutingModule } from './resetpasswordemaillink-routing.module';

import { ResetpasswordemaillinkPage } from './resetpasswordemaillink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetpasswordemaillinkPageRoutingModule
  ],
  declarations: [ResetpasswordemaillinkPage]
})
export class ResetpasswordemaillinkPageModule {}
