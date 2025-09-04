import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatElsePage } from './what-else.page';

describe('WhatElsePage', () => {
  let component: WhatElsePage;
  let fixture: ComponentFixture<WhatElsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatElsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatElsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
