import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompletedBookingsComponent } from './list-completed-bookings.component';

describe('ListCompletedBookingsComponent', () => {
  let component: ListCompletedBookingsComponent;
  let fixture: ComponentFixture<ListCompletedBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompletedBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompletedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
