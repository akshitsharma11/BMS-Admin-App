import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubadminComponent } from './delete-subadmin.component';

describe('DeleteSubadminComponent', () => {
  let component: DeleteSubadminComponent;
  let fixture: ComponentFixture<DeleteSubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
