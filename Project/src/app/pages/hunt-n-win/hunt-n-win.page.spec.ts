import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HuntNWinPage } from './hunt-n-win.page';

describe('HuntNWinPage', () => {
  let component: HuntNWinPage;
  let fixture: ComponentFixture<HuntNWinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntNWinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HuntNWinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
