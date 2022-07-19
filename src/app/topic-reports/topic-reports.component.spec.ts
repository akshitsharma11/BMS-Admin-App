import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicReportsComponent } from './topic-reports.component';

describe('TopicReportsComponent', () => {
  let component: TopicReportsComponent;
  let fixture: ComponentFixture<TopicReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
