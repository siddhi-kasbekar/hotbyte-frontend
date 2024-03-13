import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMenuItemsComponent } from './display-menu-items.component';

describe('DisplayMenuItemsComponent', () => {
  let component: DisplayMenuItemsComponent;
  let fixture: ComponentFixture<DisplayMenuItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMenuItemsComponent]
    });
    fixture = TestBed.createComponent(DisplayMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
