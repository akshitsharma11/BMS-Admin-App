import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudioComponent } from './create-studio.component';

describe('CreateStudioComponent', () => {
  let component: CreateStudioComponent;
  let fixture: ComponentFixture<CreateStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
