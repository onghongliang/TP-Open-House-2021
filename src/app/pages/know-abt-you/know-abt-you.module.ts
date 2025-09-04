import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnowAbtYouPageRoutingModule } from './know-abt-you-routing.module';

import { KnowAbtYouPage } from './know-abt-you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnowAbtYouPageRoutingModule
  ],
  declarations: [KnowAbtYouPage]
})
export class KnowAbtYouPageModule {}
