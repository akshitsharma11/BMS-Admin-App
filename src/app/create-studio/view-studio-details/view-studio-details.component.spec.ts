import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudioDetailsComponent } from './view-studio-details.component';

describe('ViewStudioDetailsComponent', () => {
  let component: ViewStudioDetailsComponent;
  let fixture: ComponentFixture<ViewStudioDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudioDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
