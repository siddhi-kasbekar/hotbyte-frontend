import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDiscountComponent } from './display-discount.component';

describe('DisplayDiscountComponent', () => {
  let component: DisplayDiscountComponent;
  let fixture: ComponentFixture<DisplayDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDiscountComponent]
    });
    fixture = TestBed.createComponent(DisplayDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
