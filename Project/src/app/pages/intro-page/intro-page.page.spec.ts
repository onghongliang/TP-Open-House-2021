import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroPagePage } from './intro-page.page';

describe('IntroPagePage', () => {
  let component: IntroPagePage;
  let fixture: ComponentFixture<IntroPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
