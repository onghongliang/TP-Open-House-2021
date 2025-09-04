import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CBySchoolPageRoutingModule } from './c-by-school-routing.module';

import { CBySchoolPage } from './c-by-school.page';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CBySchoolPageRoutingModule,
    IonicHeaderParallaxModule
  ],
  declarations: [CBySchoolPage]
})
export class CBySchoolPageModule {}
