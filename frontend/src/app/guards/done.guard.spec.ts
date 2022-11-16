import { TestBed } from '@angular/core/testing';

import { DoneGuard } from './done.guard';

describe('DoneGuard', () => {
  let guard: DoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
