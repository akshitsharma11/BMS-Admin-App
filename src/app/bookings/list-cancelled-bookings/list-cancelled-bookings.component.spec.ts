import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelledBookingsComponent } from './list-cancelled-bookings.component';

describe('ListCancelledBookingsComponent', () => {
  let component: ListCancelledBookingsComponent;
  let fixture: ComponentFixture<ListCancelledBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCancelledBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCancelledBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
