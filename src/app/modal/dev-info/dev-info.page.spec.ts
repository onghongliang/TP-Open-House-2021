import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevInfoPage } from './dev-info.page';

describe('DevInfoPage', () => {
  let component: DevInfoPage;
  let fixture: ComponentFixture<DevInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
