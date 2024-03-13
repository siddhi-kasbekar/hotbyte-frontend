import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManagerComponent } from './register-manager.component';

describe('RegisterManagerComponent', () => {
  let component: RegisterManagerComponent;
  let fixture: ComponentFixture<RegisterManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterManagerComponent]
    });
    fixture = TestBed.createComponent(RegisterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
