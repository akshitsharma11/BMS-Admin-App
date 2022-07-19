import { TestBed } from '@angular/core/testing';

import { OnlyLoginGuardService } from './only-login-guard.service';

describe('OnlyLoginGuardService', () => {
  let service: OnlyLoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyLoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
