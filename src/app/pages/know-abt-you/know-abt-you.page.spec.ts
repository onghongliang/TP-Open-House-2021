import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnowAbtYouPage } from './know-abt-you.page';

describe('KnowAbtYouPage', () => {
  let component: KnowAbtYouPage;
  let fixture: ComponentFixture<KnowAbtYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowAbtYouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnowAbtYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
