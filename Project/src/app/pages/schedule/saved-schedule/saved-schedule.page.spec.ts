import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedSchedulePage } from './saved-schedule.page';

describe('SavedSchedulePage', () => {
  let component: SavedSchedulePage;
  let fixture: ComponentFixture<SavedSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
