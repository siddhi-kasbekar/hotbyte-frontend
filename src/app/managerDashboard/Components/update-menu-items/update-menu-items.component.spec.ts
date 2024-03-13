import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuItemsComponent } from './update-menu-items.component';

describe('UpdateMenuItemsComponent', () => {
  let component: UpdateMenuItemsComponent;
  let fixture: ComponentFixture<UpdateMenuItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMenuItemsComponent]
    });
    fixture = TestBed.createComponent(UpdateMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
