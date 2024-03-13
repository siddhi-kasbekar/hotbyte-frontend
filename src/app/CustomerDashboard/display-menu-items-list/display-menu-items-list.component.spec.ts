import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMenuItemsListComponent } from './display-menu-items-list.component';

describe('DisplayMenuItemsListComponent', () => {
  let component: DisplayMenuItemsListComponent;
  let fixture: ComponentFixture<DisplayMenuItemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMenuItemsListComponent]
    });
    fixture = TestBed.createComponent(DisplayMenuItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
