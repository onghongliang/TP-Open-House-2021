import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourPopComponent } from './tour-pop.component';

describe('TourPopComponent', () => {
  let component: TourPopComponent;
  let fixture: ComponentFixture<TourPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
