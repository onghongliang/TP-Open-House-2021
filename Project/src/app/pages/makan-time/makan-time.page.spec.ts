import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakanTimePage } from './makan-time.page';

describe('MakanTimePage', () => {
  let component: MakanTimePage;
  let fixture: ComponentFixture<MakanTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakanTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakanTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
