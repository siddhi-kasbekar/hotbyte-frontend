import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayManagersComponent } from './display-managers.component';

describe('DisplayManagersComponent', () => {
  let component: DisplayManagersComponent;
  let fixture: ComponentFixture<DisplayManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayManagersComponent]
    });
    fixture = TestBed.createComponent(DisplayManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
