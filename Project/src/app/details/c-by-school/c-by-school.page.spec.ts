import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CBySchoolPage } from './c-by-school.page';

describe('CBySchoolPage', () => {
  let component: CBySchoolPage;
  let fixture: ComponentFixture<CBySchoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CBySchoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CBySchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
