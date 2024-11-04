import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { userTypeGuard } from './user-type.guard';

describe('userTypeGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userTypeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
