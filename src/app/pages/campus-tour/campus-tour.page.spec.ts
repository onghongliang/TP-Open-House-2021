import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampusTourPage } from './campus-tour.page';

describe('CampusTourPage', () => {
  let component: CampusTourPage;
  let fixture: ComponentFixture<CampusTourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusTourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampusTourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
