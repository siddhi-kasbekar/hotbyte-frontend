import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterationComponent } from './customer-registeration.component';

describe('CustomerRegisterationComponent', () => {
  let component: CustomerRegisterationComponent;
  let fixture: ComponentFixture<CustomerRegisterationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRegisterationComponent]
    });
    fixture = TestBed.createComponent(CustomerRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
