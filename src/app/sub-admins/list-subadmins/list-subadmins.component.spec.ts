import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubadminsComponent } from './list-subadmins.component';

describe('ListSubadminsComponent', () => {
  let component: ListSubadminsComponent;
  let fixture: ComponentFixture<ListSubadminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubadminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
