import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqdetailsPageRoutingModule } from './faqdetails-routing.module';

import { FaqdetailsPage } from './faqdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqdetailsPageRoutingModule
  ],
  declarations: [FaqdetailsPage]
})
export class FaqdetailsPageModule {}
