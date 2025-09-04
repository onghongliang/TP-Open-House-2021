import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForTheGramPage } from './for-the-gram.page';

describe('ForTheGramPage', () => {
  let component: ForTheGramPage;
  let fixture: ComponentFixture<ForTheGramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForTheGramPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForTheGramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
