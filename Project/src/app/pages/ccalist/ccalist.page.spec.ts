import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CcalistPage } from './ccalist.page';

describe('CcalistPage', () => {
  let component: CcalistPage;
  let fixture: ComponentFixture<CcalistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcalistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CcalistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
