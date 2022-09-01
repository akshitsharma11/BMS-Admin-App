import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveBookingsComponent } from './list-active-bookings.component';

describe('ListActiveBookingsComponent', () => {
  let component: ListActiveBookingsComponent;
  let fixture: ComponentFixture<ListActiveBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActiveBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
