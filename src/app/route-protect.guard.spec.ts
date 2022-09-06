import { TestBed } from '@angular/core/testing';

import { RouteProtectGuard } from './route-protect.guard';

describe('RouteProtectGuard', () => {
  let guard: RouteProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
