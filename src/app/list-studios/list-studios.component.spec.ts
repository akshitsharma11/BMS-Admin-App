import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudiosComponent } from './list-studios.component';

describe('ListStudiosComponent', () => {
  let component: ListStudiosComponent;
  let fixture: ComponentFixture<ListStudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
