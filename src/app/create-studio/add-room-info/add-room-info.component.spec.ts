import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomInfoComponent } from './add-room-info.component';

describe('AddRoomInfoComponent', () => {
  let component: AddRoomInfoComponent;
  let fixture: ComponentFixture<AddRoomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
