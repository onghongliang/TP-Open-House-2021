import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatElsePageRoutingModule } from './what-else-routing.module';

import { WhatElsePage } from './what-else.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatElsePageRoutingModule
  ],
  declarations: [WhatElsePage]
})
export class WhatElsePageModule {}
