import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTopicComponent } from './create-new-topic.component';

describe('CreateNewTopicComponent', () => {
  let component: CreateNewTopicComponent;
  let fixture: ComponentFixture<CreateNewTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
