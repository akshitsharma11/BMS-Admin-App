import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlotBookingComponent } from './create-slot-booking.component';

describe('CreateSlotBookingComponent', () => {
  let component: CreateSlotBookingComponent;
  let fixture: ComponentFixture<CreateSlotBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSlotBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSlotBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
