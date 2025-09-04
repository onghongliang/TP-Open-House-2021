import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CcalistPageRoutingModule } from './ccalist-routing.module';

import { CcalistPage } from './ccalist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CcalistPageRoutingModule
  ],
  declarations: [CcalistPage]
})
export class CcalistPageModule {}
