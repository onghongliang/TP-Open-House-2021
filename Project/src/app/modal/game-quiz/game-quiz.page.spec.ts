import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameQuizPage } from './game-quiz.page';

describe('GameQuizPage', () => {
  let component: GameQuizPage;
  let fixture: ComponentFixture<GameQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
