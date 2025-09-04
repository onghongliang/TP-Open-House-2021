import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GettinTherePage } from './gettin-there.page';

describe('GettinTherePage', () => {
  let component: GettinTherePage;
  let fixture: ComponentFixture<GettinTherePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettinTherePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GettinTherePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
