import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaqdetailsPage } from './faqdetails.page';

describe('FaqdetailsPage', () => {
  let component: FaqdetailsPage;
  let fixture: ComponentFixture<FaqdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
