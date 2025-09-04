import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetpasswordemaillinkPage } from './resetpasswordemaillink.page';

describe('ResetpasswordemaillinkPage', () => {
  let component: ResetpasswordemaillinkPage;
  let fixture: ComponentFixture<ResetpasswordemaillinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordemaillinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpasswordemaillinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
