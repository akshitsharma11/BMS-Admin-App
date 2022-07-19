import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendUserComponent } from './suspend-user.component';

describe('SuspendUserComponent', () => {
  let component: SuspendUserComponent;
  let fixture: ComponentFixture<SuspendUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
