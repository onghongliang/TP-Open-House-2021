import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolyWebinarPage } from './poly-webinar.page';

describe('PolyWebinarPage', () => {
  let component: PolyWebinarPage;
  let fixture: ComponentFixture<PolyWebinarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyWebinarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolyWebinarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
