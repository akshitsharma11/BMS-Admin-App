import { TestBed } from '@angular/core/testing';

import { SuggesstionService } from './suggesstion.service';

describe('SuggesstionService', () => {
  let service: SuggesstionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggesstionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
