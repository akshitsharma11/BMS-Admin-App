import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudioDetailsComponent } from './show-studio-details.component';

describe('ShowStudioDetailsComponent', () => {
  let component: ShowStudioDetailsComponent;
  let fixture: ComponentFixture<ShowStudioDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudioDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
