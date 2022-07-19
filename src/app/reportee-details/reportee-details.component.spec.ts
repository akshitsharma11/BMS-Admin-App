import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteeDetailsComponent } from './reportee-details.component';

describe('ReporteeDetailsComponent', () => {
  let component: ReporteeDetailsComponent;
  let fixture: ComponentFixture<ReporteeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
