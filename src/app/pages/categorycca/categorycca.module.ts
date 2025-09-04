import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryccaPageRoutingModule } from './categorycca-routing.module';

import { CategoryccaPage } from './categorycca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryccaPageRoutingModule
  ],
  declarations: [CategoryccaPage]
})
export class CategoryccaPageModule {}
