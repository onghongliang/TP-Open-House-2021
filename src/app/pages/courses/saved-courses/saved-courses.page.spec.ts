import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedCoursesPage } from './saved-courses.page';

describe('SavedCoursesPage', () => {
  let component: SavedCoursesPage;
  let fixture: ComponentFixture<SavedCoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
