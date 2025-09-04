import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HuntNWinPageRoutingModule } from './hunt-n-win-routing.module';

import { HuntNWinPage } from './hunt-n-win.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HuntNWinPageRoutingModule,
    IonBottomDrawerModule
  ],
  declarations: [HuntNWinPage]
})
export class HuntNWinPageModule {}
