import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForTheGramPageRoutingModule } from './for-the-gram-routing.module';

import { ForTheGramPage } from './for-the-gram.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForTheGramPageRoutingModule
  ],
  declarations: [ForTheGramPage]
})
export class ForTheGramPageModule {}
