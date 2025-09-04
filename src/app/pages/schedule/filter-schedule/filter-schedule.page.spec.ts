import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterSchedulePage } from './filter-schedule.page';

describe('FilterSchedulePage', () => {
  let component: FilterSchedulePage;
  let fixture: ComponentFixture<FilterSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
