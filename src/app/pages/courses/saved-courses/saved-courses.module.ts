import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedCoursesPageRoutingModule } from './saved-courses-routing.module';

import { SavedCoursesPage } from './saved-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedCoursesPageRoutingModule
  ],
  declarations: [SavedCoursesPage]
})
export class SavedCoursesPageModule {}
