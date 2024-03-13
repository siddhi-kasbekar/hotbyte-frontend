import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomersComponent } from './display-customers.component';

describe('DisplayCustomersComponent', () => {
  let component: DisplayCustomersComponent;
  let fixture: ComponentFixture<DisplayCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCustomersComponent]
    });
    fixture = TestBed.createComponent(DisplayCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
