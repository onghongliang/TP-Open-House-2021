import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CSearchPage } from './c-search.page';

describe('CSearchPage', () => {
  let component: CSearchPage;
  let fixture: ComponentFixture<CSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
