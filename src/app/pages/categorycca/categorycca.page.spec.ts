import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryccaPage } from './categorycca.page';

describe('CategoryccaPage', () => {
  let component: CategoryccaPage;
  let fixture: ComponentFixture<CategoryccaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryccaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryccaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
