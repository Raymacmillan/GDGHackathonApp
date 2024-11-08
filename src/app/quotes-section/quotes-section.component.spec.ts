import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSectionComponent } from './quotes-section.component';

describe('QuotesSectionComponent', () => {
  let component: QuotesSectionComponent;
  let fixture: ComponentFixture<QuotesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
